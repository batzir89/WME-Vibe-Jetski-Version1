import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Overlay from 'ol/Overlay';
import { fromLonLat } from 'ol/proj';
import { Style, Stroke, Fill } from 'ol/style';
import { ClusterPin } from './ClusterPin';
import { PolygonStyleProps } from './PolygonStyleEditor';

interface MapContentProps {
  polygonStyle: PolygonStyleProps;
  showIssues: boolean;
  onPolygonSelect?: () => void;
  onPlaceSelect?: (placeName: string) => void;
}

export const MapContent: React.FC<MapContentProps> = ({
  polygonStyle,
  showIssues,
  onPolygonSelect
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const polygonFeatureRef = useRef<Feature<Polygon> | null>(null);
  const extraPinsRef = useRef<Array<{ element: HTMLDivElement; overlay: Overlay }>>([]);
  const [clusterPortalElement, setClusterPortalElement] = useState<HTMLDivElement | null>(null);

  // Soho London coordinates
  const sohoCenterLonLat = [-0.1365, 51.5136];

  useEffect(() => {
    if (!mapRef.current) return;

    // Create Soho Polygon Geometry
    const polygonCoords = [
      fromLonLat([sohoCenterLonLat[0] - 0.002, sohoCenterLonLat[1] + 0.0015]),
      fromLonLat([sohoCenterLonLat[0] + 0.002, sohoCenterLonLat[1] + 0.0015]),
      fromLonLat([sohoCenterLonLat[0] + 0.0025, sohoCenterLonLat[1] - 0.0015]),
      fromLonLat([sohoCenterLonLat[0] - 0.002, sohoCenterLonLat[1] - 0.001]),
      fromLonLat([sohoCenterLonLat[0] - 0.002, sohoCenterLonLat[1] + 0.0015]),
    ];

    const polygonGeometry = new Polygon([polygonCoords]);
    const polygonFeature = new Feature({
      geometry: polygonGeometry,
      name: 'Soho Food Cluster Zone'
    });
    polygonFeatureRef.current = polygonFeature;

    const vectorSource = new VectorSource({
      features: [polygonFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat(sohoCenterLonLat),
        zoom: 16.5
      })
    });

    mapInstanceRef.current = map;

    // Create the Cluster Pin Overlay at Soho Center
    const clusterPosition = fromLonLat([sohoCenterLonLat[0] + 0.0003, sohoCenterLonLat[1] - 0.0003]);
    const clusterContainer = document.createElement('div');
    clusterContainer.className = 'cluster-pin-container-overlay';

    const clusterOverlay = new Overlay({
      element: clusterContainer,
      position: clusterPosition,
      positioning: 'center-center',
      stopEvent: true
    });
    map.addOverlay(clusterOverlay);
    setClusterPortalElement(clusterContainer);
    extraPinsRef.current.push({ element: clusterContainer, overlay: clusterOverlay });

    if (!showIssues) {
      clusterContainer.style.visibility = 'hidden';
      clusterContainer.style.pointerEvents = 'none';
    }

    return () => {
      map.setTarget(undefined);
      extraPinsRef.current = [];
      setClusterPortalElement(null);
    };
  }, []);

  // Sync Polygon Style changes dynamically
  useEffect(() => {
    if (!polygonFeatureRef.current) return;

    const newStyle = new Style({
      stroke: polygonStyle.showStroke
        ? new Stroke({
            color: polygonStyle.strokeColor,
            width: polygonStyle.strokeWidth,
            lineDash: [8, 4]
          })
        : undefined,
      fill: polygonStyle.showFill
        ? new Fill({
            color: `rgba(0, 117, 227, ${polygonStyle.fillOpacity})`
          })
        : undefined
    });

    polygonFeatureRef.current.setStyle(newStyle);
  }, [polygonStyle]);

  // Sync Cluster Pin overlay visibility
  useEffect(() => {
    if (clusterPortalElement) {
      clusterPortalElement.style.visibility = showIssues ? 'visible' : 'hidden';
      clusterPortalElement.style.pointerEvents = showIssues ? 'auto' : 'none';
    }
  }, [showIssues, clusterPortalElement]);

  return (
    <div className="relative w-full h-full">
      {/* OpenLayers Map Canvas */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Render React Portal for ClusterPin into OpenLayers Overlay */}
      {clusterPortalElement && createPortal(
        <ClusterPin 
          onSelect={() => onPolygonSelect?.()} 
          showIssues={showIssues}
        />,
        clusterPortalElement
      )}
    </div>
  );
};
