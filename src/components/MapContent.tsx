import React, { useRef, useEffect, useState, useCallback } from 'react';
import RightToolbar from './RightToolbar';
import MapFooter from './MapFooter';
import ShareLocationModal from './ShareLocationModal';
import ChatPanel from './ChatPanel';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import PolygonGeom from 'ol/geom/Polygon';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Icon, Circle as CircleStyle } from 'ol/style';
import Draw from 'ol/interaction/Draw';

interface MapContentProps {
  showIssues: boolean;
  showPOI: boolean;
  showPolygons: boolean;
  isDrawingMode: boolean;
  onDrawingComplete: () => void;
  isPOIMode: boolean;
  onPOIPlaced: () => void;
  onOpenDesignSystem: () => void;
  isShareModalOpen?: boolean;
  onToggleShareModal?: () => void;
  isChatOpen?: boolean;
  onOpenChat?: () => void;
  onPolygonSelect?: () => void;
  setHasUnsavedChanges: (hasChanges: boolean) => void;
}

const DEFAULT_POLYGON_STYLE = {
  strokeWidth: 2,
  fillOpacity: 0.2,
  strokeColor: '#842feb',
  fillColor: '#842feb',
  showStroke: true,
  showFill: true,
};

const MapContent: React.FC<MapContentProps> = ({ 
  showIssues,
  showPOI,
  showPolygons,
  isDrawingMode,
  onDrawingComplete,
  isPOIMode,
  onPOIPlaced,
  onOpenDesignSystem,
  isShareModalOpen,
  onToggleShareModal,
  isChatOpen,
  onOpenChat,
  onPolygonSelect,
  setHasUnsavedChanges
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  
  const poiLayerRef = useRef<VectorLayer<any> | null>(null);
  const polygonLayerRef = useRef<VectorLayer<any> | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);
  
  const initialLonLat = [-0.1363, 51.5135]; // Soho, London
  const initialZoom = 16;
  const [coords, setCoords] = useState(`Lon: ${initialLonLat[0].toFixed(5)}, Lat: ${initialLonLat[1].toFixed(5)}`);
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [isLayerPanelOpen, setIsLayerPanelOpen] = useState(false);

  const selectedPolygonRef = useRef<Feature | null>(null);
  const hoveredPolygonRef = useRef<Feature | null>(null);

  const polygonStyleFunction = useCallback((feature: Feature) => {
    const isSelected = feature === selectedPolygonRef.current;
    const isHovered = feature === hoveredPolygonRef.current;
    
    const styleProps = (feature.get('styleProps') as typeof DEFAULT_POLYGON_STYLE) || DEFAULT_POLYGON_STYLE;
    const styles: Style[] = [];

    if (styleProps.showFill) {
      styles.push(new Style({
        fill: new Fill({
          color: 'rgba(132, 47, 235, 0.25)',
        }),
        zIndex: 1,
      }));
    }

    if (styleProps.showStroke) {
      styles.push(new Style({
        stroke: new Stroke({
          color: styleProps.strokeColor,
          width: styleProps.strokeWidth,
        }),
        zIndex: 15,
      }));
    }

    if (isHovered) {
      styles.push(new Style({
        stroke: new Stroke({
          color: '#f1ff00',
          width: 5,
        }),
        zIndex: 20,
      }));
    }

    if (isSelected) {
      styles.push(new Style({
        stroke: new Stroke({
          color: '#00ece3',
          width: 5,
        }),
        zIndex: 21,
      }));
    }

    return styles;
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            maxZoom: 22,
            crossOrigin: 'anonymous'
          })
        })
      ],
      view: new View({
        center: fromLonLat(initialLonLat),
        zoom: initialZoom,
        minZoom: 1,
        maxZoom: 22,
      }),
      controls: [],
    });

    polygonLayerRef.current = new VectorLayer({
      source: new VectorSource(),
      zIndex: 5,
      style: (f: any) => polygonStyleFunction(f)
    });
    map.addLayer(polygonLayerRef.current);

    poiLayerRef.current = new VectorLayer({
      source: new VectorSource(),
      zIndex: 20,
      style: new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: '#3B82F6' }),
          stroke: new Stroke({ color: '#FFFFFF', width: 2 })
        })
      })
    });
    map.addLayer(poiLayerRef.current);

    // Seed Soho London Polygons
    const polySource = polygonLayerRef.current.getSource()!;
    const baseLon = -0.1363;
    const baseLat = 51.5135;
    for (let i = 0; i < 8; i++) {
      const centerLon = baseLon + (Math.random() - 0.5) * 0.012;
      const centerLat = baseLat + (Math.random() - 0.5) * 0.008;
      const numPoints = 4 + Math.floor(Math.random() * 3);
      const radius = 0.001 + Math.random() * 0.001;
      
      const polyCoords = [];
      for (let j = 0; j < numPoints; j++) {
        const angle = (j / numPoints) * Math.PI * 2;
        const pLon = centerLon + Math.cos(angle) * radius;
        const pLat = centerLat + Math.sin(angle) * radius;
        polyCoords.push(fromLonLat([pLon, pLat]));
      }
      polyCoords.push(polyCoords[0]);

      const polyFeature = new Feature({
        geometry: new PolygonGeom([polyCoords]),
      });
      polyFeature.set('styleProps', { ...DEFAULT_POLYGON_STYLE });
      polySource.addFeature(polyFeature);
    }

    // Pointer move highlight
    map.on('pointermove', (evt: any) => {
      if (evt.dragging) return;
      const pixel = map.getEventPixel(evt.originalEvent);
      let hovered: any = null;

      map.forEachFeatureAtPixel(pixel, (feature: any, layer: any) => {
        if (layer === polygonLayerRef.current && !hovered) {
          hovered = feature;
        }
      });

      if (hovered !== hoveredPolygonRef.current) {
        const old = hoveredPolygonRef.current;
        hoveredPolygonRef.current = hovered;
        if (old) old.changed();
        if (hovered) hovered.changed();
      }

      const targetEl = map.getTargetElement();
      if (targetEl) {
        targetEl.style.cursor = hovered ? 'pointer' : '';
      }
    });

    map.on('click', (e: any) => {
      let selected: any = null;
      map.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) => {
        if (layer === polygonLayerRef.current && !selected) {
          selected = feature;
        }
      });

      if (selectedPolygonRef.current) {
        const old = selectedPolygonRef.current;
        selectedPolygonRef.current = null;
        old.changed();
      }

      if (selected) {
        selectedPolygonRef.current = selected;
        selected.changed();
        if (onPolygonSelect) onPolygonSelect();
      }
    });

    map.on('moveend', () => {
      const center = map.getView().getCenter();
      if (center) {
        const lonLat = toLonLat(center);
        setCoords(`Lon: ${lonLat[0].toFixed(5)}, Lat: ${lonLat[1].toFixed(5)}`);
      }
      const currentZoom = map.getView().getZoom();
      if (currentZoom !== undefined) setZoomLevel(Math.round(currentZoom));
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(undefined);
        mapRef.current = null;
      }
    };
  }, [polygonStyleFunction, onPolygonSelect]);

  // Drawing Mode Interaction
  useEffect(() => {
    if (!mapRef.current || !polygonLayerRef.current) return;
    const map = mapRef.current;

    if (isDrawingMode) {
      const draw = new Draw({
        source: polygonLayerRef.current.getSource()!,
        type: 'Polygon',
      });

      draw.on('drawend', (event: any) => {
        const feature = event.feature;
        feature.set('styleProps', { ...DEFAULT_POLYGON_STYLE });
        setHasUnsavedChanges(true);
        onDrawingComplete();
      });

      map.addInteraction(draw);
      drawInteractionRef.current = draw;
    } else {
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
        drawInteractionRef.current = null;
      }
    }

    return () => {
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
        drawInteractionRef.current = null;
      }
    };
  }, [isDrawingMode, onDrawingComplete, setHasUnsavedChanges]);

  const handleZoomIn = () => {
    if (!mapRef.current) return;
    const view = mapRef.current.getView();
    const current = view.getZoom();
    if (current !== undefined) view.animate({ zoom: current + 1, duration: 300 });
  };

  const handleZoomOut = () => {
    if (!mapRef.current) return;
    const view = mapRef.current.getView();
    const current = view.getZoom();
    if (current !== undefined) view.animate({ zoom: current - 1, duration: 300 });
  };

  return (
    <div className="flex-grow relative overflow-hidden bg-slate-900">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Mode Status Indicator */}
      {(isDrawingMode || isPOIMode) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-primary text-white px-5 py-2.5 rounded-full shadow-elevation-3 flex items-center gap-2.5 text-xs font-bold animate-in fade-in duration-150">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>{isDrawingMode ? 'Drawing Polygon Mode — Click map to add points' : 'Placement Mode — Click map to place marker'}</span>
        </div>
      )}

      {/* Right Map Toolbar */}
      <RightToolbar 
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onToggleLayerPanel={() => setIsLayerPanelOpen(!isLayerPanelOpen)}
        onToggleShareModal={onToggleShareModal}
        isShareOpen={isShareModalOpen}
        isChatOpen={isChatOpen}
      />

      {/* Bottom Map Status Bar */}
      <MapFooter 
        coords={coords}
        zoomLevel={zoomLevel}
        onOpenDesignSystem={onOpenDesignSystem}
        onOpenChat={onOpenChat}
      />

      <ShareLocationModal 
        isOpen={!!isShareModalOpen}
        onClose={() => onToggleShareModal && onToggleShareModal()}
      />

      <ChatPanel 
        isOpen={!!isChatOpen}
        onClose={() => onOpenChat && onOpenChat()}
      />
    </div>
  );
};

export default MapContent;
