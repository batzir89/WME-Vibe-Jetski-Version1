import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RightToolbar from './RightToolbar';
import MapFooter from './MapFooter';
import ShareLocationModal from './ShareLocationModal';
import ChatPanel from './ChatPanel';
import { generateIconDataUrls } from './MapIcons';
import InfoCard, { ComplexPinData } from './InfoCard';
import VideoPlayer from './VideoPlayer';
import TileRecoveryNotification from './TileRecoveryNotification';
import { PolygonStyleEditor, PolygonStyleProps } from './PolygonStyleEditor';
import { ClusterPin } from './ClusterPin';
import { createPortal } from 'react-dom';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import PolygonGeom from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Stroke, Fill, Icon, Circle as CircleStyle } from 'ol/style';
import Draw from 'ol/interaction/Draw';

const homeIconUrl = '/components/icons/inner/home.svg';
const destIconUrl = '/components/icons/inner/destination.svg';

const MAP_PADDING = 10;
const SNAP_DEFAULTS = {
  position: { x: MAP_PADDING, y: MAP_PADDING },
  size: { width: 320, height: 494 },
};
const VIDEO_PLAYER_HEIGHT = 266;

const suggestedEditPinIconSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8391 3.24287C13.8091 3.07931 12.8175 2.68829 12.0253 2.01104C11.1666 1.27501 10.0523 0.830322 8.8307 0.830322C6.11658 0.830322 4.89498 2.47361 4.34551 3.87667C3.95705 4.87338 3.40247 5.51741 2.62044 6.24833C1.21993 7.55683 1.62884 9.5988 2.4211 10.524C2.95779 11.1501 2.59999 12.1161 1.98408 12.5378C1.74896 12.6733 1.47039 12.755 1.16115 12.755C1.15349 13.5677 3.21846 16.885 7.31775 16.8927L9.77885 16.8952C10.9851 16.8952 12.1198 16.586 13.1114 16.0416C13.7452 15.7043 14.4097 15.4155 15.1151 15.2775C16.927 14.9197 17.8317 13.1895 17.4995 11.2114C17.4228 10.754 17.4535 10.0256 17.6017 9.58602C19.0687 5.17751 16.7865 3.5521 14.8391 3.24287Z" fill="#FCE354"/>
<path d="M17.862 4.73274C17.4531 4.05804 16.9036 3.62358 16.3592 3.33735C15.8149 3.05367 15.2782 2.92333 14.8999 2.86199C13.8649 2.69843 12.9576 2.3023 12.2727 1.71706C11.3143 0.896689 10.0927 0.444336 8.83024 0.444336C5.89379 0.444336 4.57762 2.2333 3.98982 3.73603C3.62692 4.66629 3.11578 5.2592 2.35931 5.96457C0.787575 7.43663 1.21437 9.70095 2.1293 10.7718C2.2673 10.9328 2.32353 11.1347 2.2903 11.3698C2.24941 11.6944 2.05007 12.0215 1.77917 12.2106C1.59516 12.3154 1.3856 12.3691 1.1607 12.3716C0.951137 12.3716 0.779908 12.5403 0.777352 12.7499C0.774796 13.3198 1.35493 14.3241 2.15997 15.1368C2.56376 15.5457 3.21545 16.0978 4.11249 16.5373C4.11249 16.5373 4.11249 16.5373 4.11505 16.5373C4.10482 16.6115 4.09971 16.6881 4.09971 16.7648C4.09971 17.8944 5.01464 18.8093 6.14424 18.8093C7.09751 18.8093 7.89487 18.1551 8.12233 17.2734L9.7784 17.2759H9.78606C10.0135 18.1576 10.816 18.8093 11.7667 18.8093C12.8963 18.8093 13.8112 17.8944 13.8112 16.7648C13.8112 16.5552 13.7806 16.3533 13.7218 16.1642C14.2585 15.9061 14.7338 15.7425 15.1913 15.6505C17.154 15.2646 18.2606 13.4118 17.8798 11.1475C17.8083 10.7207 17.8466 10.0613 17.9642 9.70606C18.6517 7.64875 18.6159 5.97479 17.862 4.73274ZM17.2384 9.46327C17.0569 10.0076 17.0441 10.8024 17.1234 11.2727C17.4326 13.1051 16.5765 14.5976 15.0431 14.8992C14.5115 15.0039 13.9697 15.1905 13.3614 15.4844C13.2209 15.5509 13.0752 15.625 12.927 15.7042C11.9686 16.2307 10.8799 16.5092 9.7784 16.5092H9.73751L8.17344 16.5067H8.17088C8.0431 15.4997 7.18695 14.7203 6.14424 14.7203C5.36477 14.7203 4.69007 15.1547 4.3425 15.7962C3.59369 15.4129 3.04678 14.9477 2.70177 14.5976C2.12419 14.0149 1.78173 13.445 1.63094 13.0821C1.82262 13.0386 2.00407 12.9671 2.1753 12.8674C2.18297 12.8623 2.19063 12.8572 2.1983 12.8521C2.65321 12.5403 2.97778 12.0113 3.04934 11.472C3.10812 11.0222 2.988 10.598 2.70943 10.2734C2.01429 9.45816 1.67183 7.65386 2.88066 6.52681C3.69592 5.76267 4.28628 5.0752 4.70029 4.0146C5.42866 2.15407 6.81638 1.21103 8.82769 1.21103C9.90618 1.21103 10.9514 1.5995 11.7718 2.29975C12.5641 2.977 13.6017 3.43191 14.7773 3.62102C15.4009 3.7207 16.5483 4.04782 17.2052 5.12887C17.839 6.17158 17.8492 7.6283 17.2384 9.46327Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0676 8.07602C14.0676 7.65178 13.7251 7.30933 13.3009 7.30933C12.8766 7.30933 12.5342 7.65178 12.5342 8.07602C12.5342 8.50026 12.8766 8.84272 13.3009 8.84272C13.7251 8.84272 14.0676 8.50026 14.0676 8.07602Z" fill="black"/>
<path d="M9.97695 3.73101C10.2592 3.73101 10.4881 3.50216 10.4881 3.21987C10.4881 2.93758 10.2592 2.70874 9.97695 2.70874C9.69466 2.70874 9.46582 2.93758 9.46582 3.21987C9.46582 3.50216 9.69466 3.73101 9.97695 3.73101Z" fill="#FD804B"/>
<path d="M15.0893 13.4427C15.3715 13.4427 15.6004 13.2138 15.6004 12.9315C15.6004 12.6493 15.3715 12.4204 15.0893 12.4204C14.807 12.4204 14.5781 12.6493 14.5781 12.9315C14.5781 13.2138 14.807 13.4427 15.0893 13.4427Z" fill="#FD804B"/>
<path d="M12.5346 14.7203C12.8169 14.7203 13.0457 14.4914 13.0457 14.2091C13.0457 13.9268 12.8169 13.698 12.5346 13.698C12.2523 13.698 12.0234 13.9268 12.0234 14.2091C12.0234 14.4914 12.2523 14.7203 12.5346 14.7203Z" fill="#FD804B"/>
<path d="M4.10098 9.35356C4.38327 9.35356 4.61211 9.12472 4.61211 8.84243C4.61211 8.56014 4.38327 8.3313 4.10098 8.3313C3.81869 8.3313 3.58984 8.56014 3.58984 8.84243C3.58984 9.12472 3.81869 9.35356 4.10098 9.35356Z" fill="#FD804B"/>
<path d="M5.12148 7.30913C5.40377 7.30913 5.63262 7.08029 5.63262 6.798C5.63262 6.51571 5.40377 6.28687 5.12148 6.28687C4.83919 6.28687 4.61035 6.51571 4.61035 6.798C4.61035 7.08029 4.83919 7.30913 5.12148 7.30913Z" fill="#FD804B"/>
<path d="M15.601 6.28691C15.8833 6.28691 16.1121 6.05807 16.1121 5.77578C16.1121 5.49349 15.8833 5.26465 15.601 5.26465C15.3187 5.26465 15.0898 5.49349 15.0898 5.77578C15.0898 6.05807 15.3187 6.28691 15.601 6.28691Z" fill="#FD804B"/>
<path d="M4.89823 14.0359C4.83945 14.0359 4.78322 14.0232 4.727 13.995C4.15453 13.7088 3.61528 13.0367 3.5565 12.96C3.42616 12.7939 3.45428 12.5537 3.62039 12.4208C3.78651 12.2904 4.02674 12.3185 4.15964 12.4847C4.29253 12.6533 4.71677 13.1312 5.07201 13.3076C5.26113 13.4021 5.3378 13.6321 5.24324 13.8213C5.17424 13.9567 5.03623 14.0359 4.89823 14.0359Z" fill="black"/>
<path d="M10.7395 12.932C9.42588 12.932 8.23494 12.1397 7.70848 10.9104C7.62414 10.7162 7.71359 10.4913 7.91037 10.407C8.1046 10.3226 8.3295 10.4121 8.41384 10.6089C8.82019 11.5545 9.73256 12.1653 10.742 12.1653C11.7566 12.1653 12.6716 11.557 13.0779 10.6114C13.1623 10.4172 13.3846 10.3252 13.5814 10.4095C13.7756 10.4939 13.8651 10.7188 13.7833 10.913C13.2543 12.1397 12.0608 12.932 10.7395 12.932Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.33916 8.07559C9.33916 7.43923 8.82547 6.92554 8.18911 6.92554C7.55275 6.92554 7.03906 7.43923 7.03906 8.07559C7.03906 8.71195 7.55275 9.22563 8.18911 9.22563C8.82547 9.22563 9.33916 8.71195 9.33916 8.07559Z" fill="#0075E3"/>
</svg>`;
const updateRequestPinIconSvg = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8635 16.3099L9.03268 16.3088C8.82871 15.2807 7.92506 14.5057 6.84082 14.5057C6.04729 14.5057 5.35092 14.9062 4.95424 15.5318L4.95418 15.5468C4.28504 15.2061 3.67712 14.7462 3.14473 14.2061C2.51428 13.5665 2.17032 12.9814 2.01367 12.612C2.42357 12.5109 2.7933 12.2973 3.08634 11.9865C3.47554 11.5737 3.68386 11.0138 3.68398 10.4504V9.11403C3.68398 7.52193 4.21257 5.96668 5.18809 4.71136C6.58207 2.91749 8.64532 1.91333 10.8623 1.91333C12.7706 1.91333 14.5682 2.66264 15.9236 4.02336C17.2791 5.38402 18.0256 7.1884 18.0256 9.10414C18.0256 11.0249 17.2805 12.8306 15.9275 14.1887C14.6058 15.5156 12.7922 16.3099 10.8625 16.3099" fill="white"/>
<mask id="mask0_1106_5030" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="1" width="18" height="18">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1.01953H18.9188V18.9995H1V1.01953Z" fill="white"/>
</mask>
<g mask="url(#mask0_1106_5030)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8625 16.3099L9.0317 16.3088C8.82774 15.2807 7.92408 14.5057 6.83985 14.5057C6.04632 14.5057 5.34994 14.9062 4.95327 15.5318L4.95321 15.5468C4.28407 15.2061 3.67614 14.7462 3.14376 14.2061C2.51331 13.5665 2.17032 12.9814 2.01367 12.612C2.42357 12.5109 2.7933 12.2973 3.08634 11.9865C3.47554 11.5737 3.68386 11.0138 3.68398 10.4504V9.11403C3.68398 7.52193 4.21257 5.96668 5.18809 4.71136C6.58207 2.91749 8.64532 1.91333 10.8623 1.91333C12.7706 1.91333 14.5682 2.66264 15.9236 4.02336C17.2791 5.38402 18.0256 7.1884 18.0256 9.10414C18.0256 11.0249 17.2805 12.8306 15.9275 14.1887C14.6058 15.5156 12.7922 16.3099 10.8625 16.3099M18.9179 9.10406C18.9179 6.94962 18.0788 4.9208 16.5552 3.39129C15.0315 1.86183 13.0104 1.01953 10.8642 1.01953C8.40288 1.01953 6.11008 2.12043 4.5439 4.09016C3.41179 5.51397 2.79566 7.29022 2.79566 9.11198V10.4531C2.79554 11.136 2.25912 11.809 1.35314 11.8098C1.20255 11.81 1.06812 11.9103 1.0246 12.055C0.856135 12.6155 1.53917 13.8525 2.50716 14.8346C3.128 15.4645 3.84011 15.9798 4.62599 16.3688C4.60475 16.493 4.59311 16.6205 4.59311 16.7509C4.59311 17.9927 5.596 18.9995 6.83315 18.9995C7.92149 18.9995 8.8282 18.2353 9.03064 17.2024L10.9097 17.2035C11.1602 18.4735 12.4756 19.3439 13.8831 18.867C14.4955 18.6595 14.9822 18.1777 15.2011 17.5673C15.4112 16.9812 15.3822 16.4124 15.191 15.9257C15.68 15.6118 16.1387 15.2426 16.559 14.8206C18.0801 13.2936 18.9179 11.2635 18.9179 9.10406" fill="black"/>
</g>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.338 7.31062C15.338 6.81413 14.9371 6.41162 14.4424 6.41162C13.9478 6.41162 13.5469 6.81413 13.5469 7.31062C13.5469 7.80711 13.9478 8.20962 14.4424 8.20962C14.9371 8.20962 15.338 7.80711 15.338 7.31062" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.96009 7.31062C9.96009 6.81413 9.55913 6.41162 9.06452 6.41162C8.5699 6.41162 8.16895 6.81413 8.16895 7.31062C8.16895 7.80711 8.5699 8.20962 9.06452 8.20962C9.55913 8.20962 9.96009 7.80711 9.96009 7.31062" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.33735 10.2552C9.26291 10.098 9.10259 10 8.92917 10C8.60412 10 8.38509 10.3394 8.52387 10.6344C9.09727 11.8536 10.3332 12.6972 11.7654 12.6972C13.1977 12.6972 14.4336 11.8536 15.007 10.6344C15.1458 10.3394 14.9268 10 14.6017 10H14.5903C14.4197 10 14.2668 10.1006 14.1935 10.2552C13.7618 11.1666 12.8358 11.7982 11.7654 11.7982C10.6951 11.7982 9.76904 11.1666 9.33735 10.2552" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.33916 8.07559C9.33916 7.43923 8.82547 6.92554 8.18911 6.92554C7.55275 6.92554 7.03906 7.43923 7.03906 8.07559C7.03906 8.71195 7.55275 9.22563 8.18911 9.22563C8.82547 9.22563 9.33916 8.71195 9.33916 8.07559Z" fill="#0075E3"/>
</svg>`;
const playbackCarIconSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_1_125)"><circle cx="12" cy="12" r="10" fill="white"/><circle cx="12" cy="12" r="7" fill="#0099FF"/></g><defs><filter id="filter0_d_1_125" x="0" y="0" width="24" height="24" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_125"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_125" result="shape"/></filter></defs></svg>`;

interface ComplexPin {
  element: HTMLDivElement;
  overlay: Overlay;
  data: ComplexPinData;
}

interface MapContentProps {
  setHasUnsavedChanges: (hasChanges: boolean) => void;
  setIsUndoable: (isUndoable: boolean) => void;
  setIsRedoable: (isRedoable: boolean) => void;
  setIsDeletable: (isDeletable: boolean) => void;
  mapActionsRef: React.MutableRefObject<{
    handleSave: () => void;
    handleUndo: () => void;
    handleRedo: () => void;
    handleTrash: () => void;
  }>;
  selectedDrive: any | null;
  onClearDriveSelection: () => void;
  reviewedDrive: any | null;
  videoTime: number;
  onVideoTimeUpdate: (time: number) => void;
  onCloseVideoPlayer: () => void;
  activeSuggestionIndex: number;
  setActiveSuggestionIndex: (index: number) => void;
  onOpenDesignSystem: () => void;
  onToggleLayerPanel?: () => void;
  onToggleShareModal?: () => void;
  onOpenChat?: () => void;
  onTriggerSave?: () => void;
  onPolygonSelect?: () => void;
  isDrawingMode: boolean;
  onDrawingComplete: () => void;
  isPOIMode: boolean;
  onPOIPlaced: () => void;
  showIssues: boolean;
  showPOI: boolean;
  showPolygons: boolean;
  isShareModalOpen?: boolean;
  isChatOpen?: boolean;
  isChatUndocked?: boolean;
  setIsChatUndocked?: (val: boolean) => void;
  isAutoRefresh?: boolean;
}

const parseColor = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        };
    }
    const rgbResult = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(hex);
     if (rgbResult) {
        return {
            r: parseInt(rgbResult[1], 10),
            g: parseInt(rgbResult[2], 10),
            b: parseInt(rgbResult[3], 10)
        };
    }
    return null;
};

const interpolateColor = (color1: string, color2: string, factor: number) => {
    const c1 = parseColor(color1);
    const c2 = parseColor(color2);
    if (!c1 || !c2) return color1;
    
    const r = Math.round(c1.r + factor * (c2.r - c1.r));
    const g = Math.round(c1.g + factor * (c2.g - c1.g));
    const b = Math.round(c1.b + factor * (c2.b - c1.b));
    
    return `rgb(${r},${g},${b})`;
};

const MapContent: React.FC<MapContentProps> = ({ 
  setHasUnsavedChanges, 
  setIsUndoable, 
  setIsRedoable,
  setIsDeletable,
  mapActionsRef,
  selectedDrive,
  onClearDriveSelection,
  reviewedDrive,
  videoTime,
  onVideoTimeUpdate,
  onCloseVideoPlayer,
  activeSuggestionIndex,
  setActiveSuggestionIndex,
  onOpenDesignSystem,
  onToggleLayerPanel,
  onToggleShareModal,
  onOpenChat,
  onTriggerSave,
  onPolygonSelect,
  isDrawingMode,
  onDrawingComplete,
  isPOIMode,
  onPOIPlaced,
  showIssues,
  showPOI,
  showPolygons,
  isShareModalOpen,
  isChatOpen,
  isChatUndocked,
  setIsChatUndocked,
  isAutoRefresh,
}) => {
  const isDrawingModeRef = useRef(isDrawingMode);
  const isPOIModeRef = useRef(isPOIMode);

  useEffect(() => {
    isDrawingModeRef.current = isDrawingMode;
  }, [isDrawingMode]);

  useEffect(() => {
    isPOIModeRef.current = isPOIMode;
  }, [isPOIMode]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const selectedIconElementRef = useRef<HTMLDivElement | null>(null);
  const iconDataUrls = useRef(generateIconDataUrls());
  const complexPinsRef = useRef<ComplexPin[]>([]);
  
  const poiLayerRef = useRef<VectorLayer<any> | null>(null);
  const polygonLayerRef = useRef<VectorLayer<any> | null>(null);
  const drawInteractionRef = useRef<Draw | null>(null);
  
  const driveRouteAnimationLayerRef = useRef<VectorLayer<any> | null>(null);
  const driveRouteStaticLayerRef = useRef<VectorLayer<any> | null>(null);
  const suggestionLayerRef = useRef<VectorLayer<any> | null>(null);
  const playbackMarkerLayerRef = useRef<VectorLayer<any> | null>(null);
  const playbackMarkerFeatureRef = useRef<Feature<Point> | null>(null);
  
  const initialLonLat = [-0.1363, 51.5135];
  const initialZoom = 16;
  const [coords, setCoords] = useState(`Lon: ${initialLonLat[0].toFixed(5)}, Lat: ${initialLonLat[1].toFixed(5)}`);
  const [zoomLevel, setZoomLevel] = useState(initialZoom);
  const [activePinIndex, setActivePinIndex] = useState<number | null>(null);
  const [isCardSnapped, setIsCardSnapped] = useState(true);
  const [isTileFailure, setIsTileFailure] = useState(false);
  const [hasDismissedFailure, setHasDismissedFailure] = useState(false);

  const selectedPolygonRef = useRef<Feature | null>(null);
  const selectedPOIRef = useRef<Feature | null>(null);
  const hoveredPolygonRef = useRef<Feature | null>(null);
  const hoveredPOIRef = useRef<Feature | null>(null);
  const polygonStyleFunctionRef = useRef<any>(null);
  const poiStyleFunctionRef = useRef<any>(null);

  const [editingPolygonStyle, setEditingPolygonStyle] = useState<PolygonStyleProps | null>(null);
  const [initialEditorPosition, setInitialEditorPosition] = useState<{ x: number, y: number } | null>(null);
  const [clusterPortalElement, setClusterPortalElement] = useState<HTMLDivElement | null>(null);

  const DEFAULT_POLYGON_STYLE: PolygonStyleProps = {
    strokeWidth: 2,
    fillOpacity: 0.2,
    strokeColor: '#842feb',
    fillColor: '#842feb',
    showStroke: true,
    showFill: true,
  };

  const getPOISvg = (isSelected: boolean, isHovered: boolean) => {
    const primaryColor = isSelected ? '#10B981' : (isHovered ? '#F471B5' : '#3B82F6');
    const secondaryColor = isSelected ? '#059669' : (isHovered ? '#DB2777' : '#1E40AF');
    const scale = isSelected ? 1.2 : (isHovered ? 1.1 : 1);
    
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="0" y="0" width="32" height="32">
            <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
          </filter>
          <linearGradient id="grad-${isSelected}-${isHovered}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${primaryColor}" />
            <stop offset="100%" style="stop-color:${secondaryColor}" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="${14 * scale}" fill="white" filter="url(#shadow)"/>
        <circle cx="16" cy="16" r="${12 * scale}" fill="url(#grad-${isSelected}-${isHovered})" fill-opacity="0.9"/>
        <path d="M16 10L10 15V22H14V18H18V22H22V15L16 10Z" fill="white"/>
        ${isSelected ? '<circle cx="16" cy="16" r="15" stroke="#10B981" stroke-width="2" />' : ''}
      </svg>
    `;
  };

  const poiStyleFunction = useCallback((feature: Feature) => {
    const isSelected = feature === selectedPOIRef.current;
    const isHovered = feature === hoveredPOIRef.current;
    
    return new Style({
      image: new Icon({
        src: `data:image/svg+xml;utf8,${encodeURIComponent(getPOISvg(isSelected, isHovered))}`,
        scale: 0.8,
        anchor: [0.5, 0.5],
      }),
      zIndex: isSelected ? 100 : (isHovered ? 90 : 20),
    });
  }, []);

  const polygonStyleFunction = useCallback((feature: Feature) => {
    const isSelected = feature === selectedPolygonRef.current;
    const isHovered = feature === hoveredPolygonRef.current;
    
    const styleProps = (feature.get('styleProps') as PolygonStyleProps) || DEFAULT_POLYGON_STYLE;
    
    const styles: Style[] = [];
    
    // Core Fill
    if (styleProps.showFill) {
      const fillColor = parseColor(styleProps.fillColor);
      const rgbaFill = fillColor 
        ? `rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${styleProps.fillOpacity})`
        : styleProps.fillColor;
        
      styles.push(new Style({
        fill: new Fill({
          color: rgbaFill,
        }),
        zIndex: 1,
      }));
    }

    // Core Stroke
    if (styleProps.showStroke) {
      styles.push(new Style({
        stroke: new Stroke({
          color: styleProps.strokeColor,
          width: styleProps.strokeWidth,
        }),
        zIndex: 15,
      }));
    }

    // Hover Highlight
    if (isHovered) {
      styles.push(new Style({
        stroke: new Stroke({
          color: '#f1ff00',
          width: Math.max(styleProps.strokeWidth + 4, 6),
        }),
        zIndex: 10,
      }));
    }
    
    // Selection Highlight
    if (isSelected) {
      styles.push(new Style({
        stroke: new Stroke({
          color: '#00ece3',
          width: Math.max(styleProps.strokeWidth + 3, 5),
        }),
        zIndex: 11,
      }));
    }

    return styles.length > 0 ? styles : new Style();
  }, [DEFAULT_POLYGON_STYLE]);

  useEffect(() => {
    polygonStyleFunctionRef.current = polygonStyleFunction;
    poiStyleFunctionRef.current = poiStyleFunction;
  }, [polygonStyleFunction, poiStyleFunction]);

  const handlePolygonStyleChange = (newStyle: PolygonStyleProps) => {
    if (selectedPolygonRef.current) {
      selectedPolygonRef.current.set('styleProps', newStyle);
      selectedPolygonRef.current.changed();
      setEditingPolygonStyle(newStyle);
    }
  };

  const [mapViewSize, setMapViewSize] = useState({ width: 0, height: 0 });
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; visible: boolean; coordinate: number[] } | null>(null);
  const extraPinsRef = useRef<{ element: HTMLDivElement, overlay: Overlay }[]>([]);
  const sohoCenterLonLat = [-0.1363, 51.5135];

  const activePinData = activePinIndex !== null ? complexPinsRef.current[activePinIndex]?.data : null;
  
  const animationTimeRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  const animationLoop = useCallback(() => {
    animationTimeRef.current = (animationTimeRef.current + 0.004) % 1;
    if (driveRouteAnimationLayerRef.current) {
      driveRouteAnimationLayerRef.current.getSource()?.changed();
    }
    animationFrameIdRef.current = requestAnimationFrame(animationLoop);
  }, []);
  
  useEffect(() => {
    if (selectedDrive) {
        if (animationFrameIdRef.current === null) {
            animationLoop();
        }
    } else {
        if (animationFrameIdRef.current !== null) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }
    }
    return () => {
        if (animationFrameIdRef.current !== null) {
            cancelAnimationFrame(animationFrameIdRef.current);
            animationFrameIdRef.current = null;
        }
    };
  }, [selectedDrive, animationLoop]);

  useEffect(() => {
    const toggleVisibility = (pin: { element: HTMLElement }) => {
      if (pin && pin.element) {
        pin.element.style.visibility = showIssues ? 'visible' : 'hidden';
        pin.element.style.pointerEvents = showIssues ? 'auto' : 'none';
      }
    };
    complexPinsRef.current.forEach(toggleVisibility);
    extraPinsRef.current.forEach(toggleVisibility);
  }, [showIssues]);

  useEffect(() => {
    if (poiLayerRef.current) {
      poiLayerRef.current.setVisible(showPOI || isPOIMode);
    }
  }, [showPOI, isPOIMode]);

  useEffect(() => {
    if (polygonLayerRef.current) {
      polygonLayerRef.current.setVisible(showPolygons);
    }
  }, [showPolygons]);

  const handleSave = useCallback(() => {
    setHasUnsavedChanges(false);
  }, [setHasUnsavedChanges]);

  useEffect(() => {
    mapActionsRef.current.handleSave = handleSave;
    mapActionsRef.current.handleUndo = () => {};
    mapActionsRef.current.handleRedo = () => {};
    mapActionsRef.current.handleTrash = () => {};
  }, [handleSave, mapActionsRef]);

  useEffect(() => {
    if (!mapRef.current || !polygonLayerRef.current) return;

    const map = mapRef.current;

    if (isDrawingMode) {
      const draw = new Draw({
        source: polygonLayerRef.current.getSource()!,
        type: 'Polygon',
        style: new Style({
          fill: new Fill({
            color: 'rgba(59, 130, 246, 0.2)',
          }),
          stroke: new Stroke({
            color: '#3b82f6',
            width: 2,
            lineDash: [4, 8]
          }),
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({
              color: '#3b82f6',
            }),
          }),
        }),
      });

      draw.on('drawend', (event: any) => {
        const feature = event.feature;
        feature.set('styleProps', { ...DEFAULT_POLYGON_STYLE });
        feature.setStyle(polygonStyleFunctionRef.current);
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
  }, [isDrawingMode, onDrawingComplete]);

  const handleDeselectRoad = () => {
    setIsDeletable(false);
  };

  const handleZoomIn = () => {
    if (!mapRef.current) return;
    const view = mapRef.current.getView();
    const currentZoom = view.getZoom();
    if (currentZoom !== undefined) {
      view.animate({
        zoom: currentZoom + 1,
        duration: 500,
      });
    }
    setIsTileFailure(true);
    setHasDismissedFailure(false);
  };

  const handleZoomOut = () => {
    if (!mapRef.current) return;
    const view = mapRef.current.getView();
    const currentZoom = view.getZoom();
    if (currentZoom !== undefined) {
      view.animate({
        zoom: currentZoom - 1,
        duration: 500,
      });
    }
  };

  const closeInfoCard = () => {
    if (activePinIndex !== null && complexPinsRef.current[activePinIndex]) {
        complexPinsRef.current[activePinIndex].element.classList.remove('active');
    }
    setActivePinIndex(null);
    setIsCardSnapped(true);
  };
  
  const handleRecenter = () => {
    if (activePinIndex === null || !mapRef.current) return;

    const view = mapRef.current.getView();
    const pin = complexPinsRef.current[activePinIndex];
    const location = pin.overlay.getPosition();
    if (!location) return;

    const resolution = view.getResolution();
    if (resolution === undefined) return;

    const infoCardOffset = (SNAP_DEFAULTS.size.width + MAP_PADDING) / 2;
    const offsetInMapUnits = infoCardOffset * resolution;
    const newCenter = [location[0] - offsetInMapUnits, location[1]];

    view.animate({
        center: newCenter,
        duration: 1000,
    });
  };
  
  const handleComplexPinClick = (index: number) => {
    onClearDriveSelection();
    handleDeselectRoad();
    const newPinToActivate = complexPinsRef.current[index];
    if (!newPinToActivate) return;
    const newPinElement = newPinToActivate.element;

    const currentlyActiveElement = mapContainerRef.current?.querySelector('.complex-pin.active');

    if (currentlyActiveElement === newPinElement) {
        closeInfoCard();
        return;
    }

    if (selectedIconElementRef.current) {
      selectedIconElementRef.current.classList.remove('selected');
      selectedIconElementRef.current = null;
    }
    
    if (currentlyActiveElement) {
        currentlyActiveElement.classList.remove('active');
    }

    newPinElement.classList.add('active');
    setIsCardSnapped(true);
    setActivePinIndex(index);

    const view = mapRef.current?.getView();
    if (!view) return;

    const location = newPinToActivate.overlay.getPosition();
    const duration = 1000;
    const currentZoom = view.getZoom();
    
    const infoCardOffset = (SNAP_DEFAULTS.size.width + MAP_PADDING) / 2;
    const resolution = view.getResolution();
    if (resolution === undefined) return;

    const offsetInMapUnits = infoCardOffset * resolution;
    const newCenter = location ? [location[0] - offsetInMapUnits, location[1]] : undefined;

    if (newCenter && currentZoom) {
      if (Math.floor(currentZoom) === 15) {
          view.animate({
              center: newCenter,
              zoom: 16,
              duration: duration,
          });
      } else {
          view.animate({
            center: newCenter,
            duration: duration,
          });

          const minZoom = view.getMinZoom();
          if (minZoom !== undefined && currentZoom > minZoom) {
            view.animate(
              { zoom: currentZoom - 0.05, duration: duration / 2 },
              { zoom: currentZoom, duration: duration / 2 }
            );
          }
      }
    }
  };

  const handleNextIssue = () => {
    if (activePinIndex === null) return;
    const newIndex = (activePinIndex + 1) % complexPinsRef.current.length;
    handleComplexPinClick(newIndex);
  };

  const handlePrevIssue = () => {
    if (activePinIndex === null) return;
    const newIndex = (activePinIndex - 1 + complexPinsRef.current.length) % complexPinsRef.current.length;
    handleComplexPinClick(newIndex);
  };

  const handleSuggestionSelect = useCallback((suggestion: any, index: number) => {
    if (!reviewedDrive || !mapRef.current) return;

    onVideoTimeUpdate(suggestion.time);
    setActiveSuggestionIndex(index);

    const totalDuration = parseDuration(reviewedDrive.duration);
    if (totalDuration > 0) {
        const progress = suggestion.time / totalDuration;
        const routeCoords = reviewedDrive.route.map((p: number[]) => fromLonLat([p[0], p[1]]));
        const routeGeom = new LineString(routeCoords);
        if (progress >= 0 && progress <= 1) {
            const coord = routeGeom.getCoordinateAt(progress);
            const view = mapRef.current.getView();
            const resolution = view.getResolution();
            if (resolution === undefined) return;
            
            const FOOTER_AREA_HEIGHT = 68;
            const yOffsetPixels = (VIDEO_PLAYER_HEIGHT + FOOTER_AREA_HEIGHT) / 2;
            const yOffsetMapUnits = yOffsetPixels * resolution;
            const newCenter = [coord[0], coord[1] - yOffsetMapUnits];

            view.animate({
                center: newCenter,
                zoom: 18,
                duration: 1000,
            });
        }
    }
  }, [reviewedDrive, onVideoTimeUpdate, setActiveSuggestionIndex]);
  
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            setMapViewSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        }
    });
    resizeObserver.observe(mapContainerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const animatedGradientSegmentStyle = useCallback((feature: Feature) => {
    const fraction = feature.get('fraction');
    const gradient = feature.get('gradient');
    const time = animationTimeRef.current;
    
    if (fraction === undefined || !gradient) return null;

    const animatedFraction = (fraction + time) % 1;
    let color;

    if (animatedFraction < 0.5) {
        color = interpolateColor(gradient[0], gradient[1], animatedFraction * 2);
    } else {
        color = interpolateColor(gradient[1], gradient[0], (animatedFraction - 0.5) * 2);
    }

    return new Style({
        stroke: new Stroke({
            color: color,
            width: 9,
            lineCap: 'round',
            lineJoin: 'round',
        }),
    });
  }, []);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
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
          constrainResolution: true,
        }),
        controls: [],
      });

      const iconAspectRatio = 48 / 44;
      const iconElements: HTMLDivElement[] = [];
      const labelElements: HTMLDivElement[] = [];

      const getBaseLabelOpacity = (iconEl: HTMLDivElement, zoom: number): '1' | '0' => {
        const LABEL_VISIBILITY_THRESHOLD = 19;
        const selectedIcon = selectedIconElementRef.current;
        if (selectedIcon) return iconEl === selectedIcon ? '1' : '0';
        return zoom >= LABEL_VISIBILITY_THRESHOLD ? '1' : '0';
      };

      const updateLabelVisibility = (zoom: number) => {
         labelElements.forEach((labelEl, index) => {
          const iconEl = iconElements[index];
          labelEl.style.opacity = getBaseLabelOpacity(iconEl, zoom);
        });
      };

      const updateAllStyles = (zoom: number | undefined) => {
        if (zoom === undefined) return;
        const ICON_VISIBILITY_THRESHOLD = 17;
        const COMPLEX_PIN_VISIBILITY_THRESHOLD = 15;
        const intZoom = Math.floor(zoom);
        if (intZoom < COMPLEX_PIN_VISIBILITY_THRESHOLD) {
          complexPinsRef.current.forEach(pin => pin.element.style.display = 'none');
          extraPinsRef.current.forEach(pin => pin.element.style.display = 'none');
        } else {
          const updatePinSize = (pin: { element: HTMLElement }) => {
            pin.element.style.display = '';
            pin.element.classList.remove('size-20', 'size-22', 'size-24', 'size-28');
            if (intZoom === 15) pin.element.classList.add('size-20');
            else if (intZoom === 16) pin.element.classList.add('size-22');
            else if (intZoom === 17) pin.element.classList.add('size-24');
            else if (intZoom >= 18) pin.element.classList.add('size-28');
          };
          complexPinsRef.current.forEach(updatePinSize);
          extraPinsRef.current.forEach(updatePinSize);
        }
        if (zoom < ICON_VISIBILITY_THRESHOLD) {
          for (const el of iconElements) el.style.display = 'none';
          for (const el of labelElements) el.style.display = 'none';
        } else {
          const minZoom = 17;
          const maxZoom = 22;
          const minPixelSize = 24;
          const maxPixelSize = 44;
          const effectiveZoom = Math.max(minZoom, Math.min(zoom, maxZoom));
          const t = (effectiveZoom - minZoom) / (maxZoom - minZoom);
          const pixelSize = minPixelSize + (maxPixelSize - minPixelSize) * t;
          for (const el of iconElements) {
            el.style.display = '';
            if (!el.classList.contains('selected')) {
              el.style.width = `${pixelSize}px`;
              el.style.height = `${pixelSize * iconAspectRatio}px`;
            }
          }
          let labelFontSize = '0px';
          if (intZoom >= 22) labelFontSize = '13px';
          else if (intZoom === 21) labelFontSize = '12px';
          else if (intZoom === 20) labelFontSize = '11px';
          else if (intZoom === 19) labelFontSize = '10px';
          else if (intZoom >= 17) labelFontSize = '10px';
          for (const el of labelElements) {
            el.style.display = '';
            el.style.fontSize = labelFontSize;
          }
        }
        updateLabelVisibility(zoom);
      };
      
      const sohoCenterLonLat = [-0.1363, 51.5135];
      for (let i = 0; i < 300; i++) {
        const lon = sohoCenterLonLat[0] + (Math.random() - 0.5) * 0.015;
        const lat = sohoCenterLonLat[1] + (Math.random() - 0.5) * 0.01;
        const position = fromLonLat([lon, lat]);
        const element = document.createElement('div');
        element.className = 'map-icon';
        const randomIconUrl = iconDataUrls.current[Math.floor(Math.random() * iconDataUrls.current.length)];
        element.style.backgroundImage = `url(${randomIconUrl})`;
        const iconOverlay = new Overlay({ element, position, positioning: 'bottom-center', stopEvent: false });
        map.addOverlay(iconOverlay);
        iconElements.push(element);
        const labelElement = document.createElement('div');
        labelElement.className = 'map-label';
        labelElement.innerText = `Soho Place ${i + 1}`;
        const labelOverlay = new Overlay({ element: labelElement, position, positioning: 'top-center', offset: [0, -6] });
        map.addOverlay(labelOverlay);
        labelElements.push(labelElement);

        element.addEventListener('mouseenter', () => { labelElement.style.opacity = '1'; });
        element.addEventListener('mouseleave', () => {
          const zoom = map.getView().getZoom();
          if (zoom !== undefined) labelElement.style.opacity = getBaseLabelOpacity(element, zoom);
        });
        element.addEventListener('click', (e) => {
          e.stopPropagation();
          setContextMenu(null);
          onClearDriveSelection();
          handleDeselectRoad();
          closeInfoCard();
          const previouslySelected = selectedIconElementRef.current;
          if (previouslySelected) previouslySelected.classList.remove('selected');
          if (previouslySelected !== element) {
            element.classList.add('selected');
            element.style.width = '56px';
            element.style.height = `${56 * iconAspectRatio}px`;
            selectedIconElementRef.current = element;
            const view = map.getView();
            const location = iconOverlay.getPosition();
            const duration = 1000;
            if (location) {
              const zoom = view.getZoom();
              view.animate({ center: location, duration });
              if (zoom !== undefined) {
                const minZoom = view.getMinZoom();
                if (minZoom !== undefined && zoom > minZoom) {
                  view.animate({ zoom: zoom - 0.05, duration: duration / 2 }, { zoom, duration: duration / 2 });
                }
              }
            }
          } else {
            selectedIconElementRef.current = null;
          }
          updateAllStyles(map.getView().getZoom());
        });
      }
      
      const createComplexPin = (pinData: ComplexPinData, position: number[], index: number) => {
        const complexPinElement = document.createElement('div');
        complexPinElement.className = 'complex-pin';
        complexPinElement.innerHTML = `<div class="pin-body"><div class="icon-container" style="background-color: ${pinData.iconBgColor};">${pinData.iconSvg}</div><div class="text-container"><div class="title">${pinData.title}</div><div class="subtitle">${pinData.subtitle}</div></div></div><div class="pin-tip"></div>`;
        const complexPinOverlay = new Overlay({ element: complexPinElement, position, positioning: 'bottom-center', stopEvent: false });
        map.addOverlay(complexPinOverlay);
        complexPinsRef.current[index] = { element: complexPinElement, data: pinData, overlay: complexPinOverlay };
        complexPinElement.addEventListener('click', (e) => { e.stopPropagation(); setContextMenu(null); handleComplexPinClick(index); });
      };
      
      const createPins = () => {
        const pinTypes = [
          { type: 'edit', suggestions: 2, days: 12, comments: 3 },
          { type: 'edit', suggestions: 1, days: 2, comments: 5 },
          { type: 'request', reason: 'Blocked road', days: 5, comments: 2 },
          { type: 'request', reason: 'Incorrect turn', days: 8, comments: 6 },
          { type: 'edit', suggestions: 3, days: 15, comments: 4 },
          { type: 'request', reason: 'General error', days: 1, comments: 1 },
          { type: 'request', reason: 'Incorrect route', days: 17, comments: 8 },
          { type: 'edit', suggestions: 1, days: 6, comments: 3 }
        ];
        const positions = [
          [sohoCenterLonLat[0] + 0.0015, sohoCenterLonLat[1] + 0.0015],
          [sohoCenterLonLat[0] - 0.0015, sohoCenterLonLat[1] - 0.0015],
          [sohoCenterLonLat[0] + 0.0015, sohoCenterLonLat[1] - 0.0015],
          [sohoCenterLonLat[0] - 0.0015, sohoCenterLonLat[1] + 0.0015],
          [sohoCenterLonLat[0] + 0.003, sohoCenterLonLat[1] + 0.0005],
          [sohoCenterLonLat[0] - 0.003, sohoCenterLonLat[1] - 0.0005],
          [sohoCenterLonLat[0] + 0.0005, sohoCenterLonLat[1] - 0.003],
          [sohoCenterLonLat[0] - 0.0005, sohoCenterLonLat[1] + 0.003]
        ];
        pinTypes.forEach((pin, index) => {
            const { days, comments } = pin;
            let iconBgColor = '#D5ACFF';
            if (days >= 4 && days <= 6) iconBgColor = '#FDD632'; 
            else if (days >= 7 && days <= 12) iconBgColor = '#FEA066'; 
            else if (days >= 13 && days <= 17) iconBgColor = '#FF7171';
            let pinData: ComplexPinData;
            if (pin.type === 'edit') pinData = { title: `${pin.suggestions ?? 1} suggested edit${(pin.suggestions ?? 1) > 1 ? 's' : ''}`, subtitle: `${days} day${days > 1 ? 's' : ''} ago • ${comments} comment${comments > 1 ? 's' : ''}`, iconSvg: suggestedEditPinIconSvg, iconBgColor };
            else pinData = { title: `Update request: ${(pin.reason ?? '').toLowerCase()}`, subtitle: `${days} day${days > 1 ? 's' : ''} ago • ${comments} comment${comments > 1 ? 's' : ''}`, iconSvg: updateRequestPinIconSvg, iconBgColor };
            createComplexPin(pinData, fromLonLat(positions[index]), index);
        });

        if (!showIssues) {
            complexPinsRef.current.forEach(pin => {
                if (pin && pin.element) {
                    pin.element.style.visibility = 'hidden';
                    pin.element.style.pointerEvents = 'none';
                }
            });
        }

        const savePinPosition = fromLonLat([-0.1363, 51.5150]);
        const savePinElement = document.createElement('div');
        savePinElement.className = 'complex-pin save-trigger-pin';
        savePinElement.innerHTML = `
          <div class="pin-body !bg-[#1BAB50]">
            <div class="icon-container !bg-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1BAB50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v13a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
            </div>
            <div class="text-container">
              <div class="title !text-white">Save Trigger</div>
              <div class="subtitle !text-white/80">Click to test flow</div>
            </div>
          </div>
          <div class="pin-tip !border-t-[#1BAB50]"></div>
        `;
        const savePinOverlay = new Overlay({ 
          element: savePinElement, 
          position: savePinPosition, 
          positioning: 'bottom-center', 
          stopEvent: false 
        });
        map.addOverlay(savePinOverlay);
        extraPinsRef.current.push({ element: savePinElement, overlay: savePinOverlay });
        savePinElement.addEventListener('click', (e) => { 
          e.stopPropagation(); 
          if (onTriggerSave) {
            onTriggerSave();
          }
        });
        
        if (!showIssues) {
          savePinElement.style.visibility = 'hidden';
          savePinElement.style.pointerEvents = 'none';
        }

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
      };
      createPins();
      
      driveRouteStaticLayerRef.current = new VectorLayer({
        source: new VectorSource(),
        zIndex: 11,
      });
      map.addLayer(driveRouteStaticLayerRef.current);
      
      driveRouteAnimationLayerRef.current = new VectorLayer({
        source: new VectorSource(),
        style: animatedGradientSegmentStyle as any,
        zIndex: 10,
      });
      map.addLayer(driveRouteAnimationLayerRef.current);
      
      suggestionLayerRef.current = new VectorLayer({
        source: new VectorSource(),
        zIndex: 26,
      });
      map.addLayer(suggestionLayerRef.current);

      poiLayerRef.current = new VectorLayer({
        source: new VectorSource(),
        zIndex: 20,
        visible: showPOI || isPOIMode,
        style: (feature: any) => poiStyleFunctionRef.current(feature)
      });
      map.addLayer(poiLayerRef.current);

      polygonLayerRef.current = new VectorLayer({
        source: new VectorSource(),
        zIndex: 5,
        visible: showPolygons,
      });
      map.addLayer(polygonLayerRef.current);

      const createPOIs = () => {
        const poiSource = poiLayerRef.current!.getSource()!;
        const baseLon = -0.1363;
        const baseLat = 51.5135;
        
        for (let i = 0; i < 40; i++) {
          const lon = baseLon + (Math.random() - 0.5) * 0.02;
          const lat = baseLat + (Math.random() - 0.5) * 0.015;
          const poiFeature = new Feature({
            geometry: new Point(fromLonLat([lon, lat])),
          });
          
          poiFeature.setStyle(poiStyleFunctionRef.current);
          poiSource.addFeature(poiFeature);
        }
      };

      const createRandomPolygons = () => {
        const polySource = polygonLayerRef.current!.getSource()!;
        const baseLon = -0.1363;
        const baseLat = 51.5135;
        
        for (let i = 0; i < 15; i++) {
          const centerLon = baseLon + (Math.random() - 0.5) * 0.03;
          const centerLat = baseLat + (Math.random() - 0.5) * 0.02;
          const numPoints = 3 + Math.floor(Math.random() * 4);
          const radius = 0.001 + Math.random() * 0.002;
          
          const coords = [];
          for (let j = 0; j < numPoints; j++) {
            const angle = (j / numPoints) * Math.PI * 2;
            const pLon = centerLon + Math.cos(angle) * radius * (0.8 + Math.random() * 0.4);
            const pLat = centerLat + Math.sin(angle) * radius * (0.8 + Math.random() * 0.4);
            coords.push(fromLonLat([pLon, pLat]));
          }
          coords.push(coords[0]);
          
          const polyFeature = new Feature({
            geometry: new PolygonGeom([coords]),
          });
          
          polyFeature.set('styleProps', { ...DEFAULT_POLYGON_STYLE });
          polyFeature.setStyle(polygonStyleFunctionRef.current);
          polySource.addFeature(polyFeature);
        }
      };

      createPOIs();
      createRandomPolygons();

      map.on('pointermove', (evt: any) => {
        if (evt.dragging || isDrawingModeRef.current) return;
        const pixel = map.getEventPixel(evt.originalEvent);
        
        let hoveredPoly: any = null;
        let hoveredPOI: any = null;
        
        map.forEachFeatureAtPixel(pixel, (feature: any, layer: any) => {
          if (layer === polygonLayerRef.current && !hoveredPoly) {
            hoveredPoly = feature;
          } else if (layer === poiLayerRef.current && !hoveredPOI) {
            hoveredPOI = feature;
          }
        }, { hitTolerance: 5 });
        
        if (hoveredPoly !== hoveredPolygonRef.current) {
          const oldHovered = hoveredPolygonRef.current;
          hoveredPolygonRef.current = hoveredPoly;
          if (oldHovered) oldHovered.changed();
          if (hoveredPoly) hoveredPoly.changed();
        }

        if (hoveredPOI !== hoveredPOIRef.current) {
          const old = hoveredPOIRef.current;
          hoveredPOIRef.current = hoveredPOI;
          if (old) old.changed();
          if (hoveredPOI) hoveredPOI.changed();
        }
        
        const hit = map.hasFeatureAtPixel(pixel, { 
          layerFilter: (l: any) => l === polygonLayerRef.current || l === poiLayerRef.current 
        });
        
        const targetEl = map.getTargetElement();
        if (targetEl) {
          if (isPOIModeRef.current || isDrawingModeRef.current) {
            targetEl.style.cursor = 'crosshair';
          } else {
            targetEl.style.cursor = hit ? 'pointer' : '';
          }
        }
      });

      map.on('click', (e: any) => {
        if (isDrawingModeRef.current) return;
        
        if (isPOIModeRef.current) {
          const feature = new Feature({
            geometry: new Point(e.coordinate),
            type: 'poi'
          });
          poiLayerRef.current!.getSource()!.addFeature(feature);
          setHasUnsavedChanges(true);
          onPOIPlaced();
          return;
        }

        let suggestionClicked = false;
        
        const featuresAtPixel: { feature: any, layer: any }[] = [];
        map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
          if (layer === poiLayerRef.current || layer === polygonLayerRef.current) {
            featuresAtPixel.push({ feature, layer });
          }
        });

        const clearSelection = () => {
          if (selectedPolygonRef.current) {
            const old = selectedPolygonRef.current;
            selectedPolygonRef.current = null;
            old.changed();
          }
          if (selectedPOIRef.current) {
            const old = selectedPOIRef.current;
            selectedPOIRef.current = null;
            old.changed();
          }
          setEditingPolygonStyle(null);
        };

        if (featuresAtPixel.length === 0) {
          clearSelection();
          return;
        }

        let currentIndex = -1;
        featuresAtPixel.forEach((item, idx) => {
          if (item.feature === selectedPolygonRef.current || item.feature === selectedPOIRef.current) {
            currentIndex = idx;
          }
        });

        const nextIndex = (currentIndex + 1) % featuresAtPixel.length;
        const target = featuresAtPixel[nextIndex];

        clearSelection();
        if (target.layer === poiLayerRef.current) {
          selectedPOIRef.current = target.feature;
        } else {
          selectedPolygonRef.current = target.feature;
          const style = target.feature.get('styleProps') || DEFAULT_POLYGON_STYLE;
          setInitialEditorPosition({ x: e.pixel[0], y: e.pixel[1] });
          setEditingPolygonStyle(style);
        }
        target.feature.changed();
        
        if (onPolygonSelect) onPolygonSelect();

        map.forEachFeatureAtPixel(e.pixel, (feature: any, layer: any) => {
            if (layer === suggestionLayerRef.current) {
                const suggestion = feature.get('suggestion');
                const index = feature.get('suggestionIndex');
                if (suggestion && index !== undefined) {
                    handleSuggestionSelect(suggestion, index);
                    suggestionClicked = true;
                }
            }
        }, {
            layerFilter: (layer: any) => layer === suggestionLayerRef.current,
            hitTolerance: 10,
        });

        if (suggestionClicked) {
            e.stopPropagation();
            return;
        }

        handleDeselectRoad();
        setContextMenu(null);
        const isInfoCardOpen = activePinIndex !== null;
        if (!isInfoCardOpen && selectedIconElementRef.current) {
          selectedIconElementRef.current.classList.remove('selected');
          selectedIconElementRef.current = null;
          updateAllStyles(map.getView().getZoom());
        }
      });
      
      map.getView().on('change:resolution', () => {
        const view = map.getView();
        const currentZoom = view.getZoom();
        if (currentZoom !== undefined) setZoomLevel(Math.round(currentZoom));
        updateAllStyles(currentZoom);
      });
      
      updateAllStyles(map.getView().getZoom());
      mapRef.current = map;
      
      map.on('moveend', () => {
        const center = map.getView().getCenter();
        if (center) {
          const lonLat = toLonLat(center);
          setCoords(`Lon: ${lonLat[0].toFixed(5)}, Lat: ${lonLat[1].toFixed(5)}`);
        }
      });
      
      const viewport = map.getViewport();
      viewport.addEventListener('contextmenu', (e: MouseEvent) => {
          e.preventDefault();
          const coordinate = map.getCoordinateFromPixel([e.offsetX, e.offsetY]);
          setContextMenu({
              x: e.clientX,
              y: e.clientY,
              visible: true,
              coordinate: coordinate || [0, 0],
          });
      });

      playbackMarkerFeatureRef.current = new Feature({
          geometry: new Point(fromLonLat([0,0])),
      });
      playbackMarkerFeatureRef.current.setStyle(new Style({
          image: new Icon({
              src: `data:image/svg+xml;utf8,${playbackCarIconSvg}`,
              scale: 1.2,
          }),
      }));

      playbackMarkerLayerRef.current = new VectorLayer({
          source: new VectorSource({
              features: [playbackMarkerFeatureRef.current]
          }),
          zIndex: 30,
      });
      map.addLayer(playbackMarkerLayerRef.current);
      playbackMarkerLayerRef.current.setVisible(false);
      
      return () => {
        if (mapRef.current) {
          mapRef.current.setTarget(undefined);
          mapRef.current = null;
        }
        complexPinsRef.current = [];
        extraPinsRef.current = [];
        setClusterPortalElement(null);
      };
    }
  }, [animatedGradientSegmentStyle, handleSuggestionSelect]);

  useEffect(() => {
        if (!mapRef.current || !driveRouteAnimationLayerRef.current || !driveRouteStaticLayerRef.current || !suggestionLayerRef.current) return;

        const animSource = driveRouteAnimationLayerRef.current.getSource()!;
        const staticSource = driveRouteStaticLayerRef.current.getSource()!;
        const suggestionSource = suggestionLayerRef.current.getSource()!;
        suggestionSource.clear();
        animSource.clear();
        staticSource.clear();

        if (selectedDrive && selectedDrive.route && selectedDrive.route.length > 1) {
            handleDeselectRoad();
            closeInfoCard();
            
            const fullRouteCoords = selectedDrive.route.map((p: number[]) => fromLonLat([p[0], p[1]]));
            const fullRouteGeom = new LineString(fullRouteCoords);
            
            const JAM_THRESHOLD = 20;
            const groups: { type: 'regular' | 'jammed', coords: number[][] }[] = [];
            let currentGroup: { type: 'regular' | 'jammed', coords: number[][] } | null = null;
    
            for (let i = 0; i < selectedDrive.route.length - 1; i++) {
                const startPoint = selectedDrive.route[i];
                const endPoint = selectedDrive.route[i+1];
                const avgSpeed = (startPoint[2] + endPoint[2]) / 2;
                const type = avgSpeed <= JAM_THRESHOLD ? 'jammed' : 'regular';
    
                if (!currentGroup || currentGroup.type !== type) {
                    if (currentGroup) {
                        groups.push(currentGroup);
                    }
                    currentGroup = { type, coords: [startPoint] };
                }
                currentGroup.coords.push(endPoint);
            }
            if (currentGroup) {
                groups.push(currentGroup);
            }
            
            const staticFeatures = [];
            const animFeatures = [];

            for (const group of groups) {
                const projectedCoords = group.coords.map(p => fromLonLat([p[0], p[1]]));
                if(projectedCoords.length < 2) continue;
                
                const lineGeom = new LineString(projectedCoords);
                
                const innerColor = '#4C04A2';
                const animGradient = group.type === 'regular' 
                    ? ['#5617A1', '#985DD5']
                    : ['#F03D3D', '#FF7A7A'];
    
                const innerLineFeature = new Feature({ geometry: lineGeom });
                innerLineFeature.setStyle(new Style({
                    stroke: new Stroke({ color: innerColor, width: 5, lineCap: 'round', lineJoin: 'round' }),
                }));
                staticFeatures.push(innerLineFeature);
    
                const length = lineGeom.getLength();
                const numSegments = Math.max(50, Math.floor(length / 2));
    
                for (let i = 0; i < numSegments; i++) {
                    const f1 = i / numSegments;
                    const f2 = (i + 1) / numSegments;
    
                    const segmentCoords = [lineGeom.getCoordinateAt(f1), lineGeom.getCoordinateAt(f2)];
                    const segmentGeom = new LineString(segmentCoords);
                    
                    const segmentFeature = new Feature({ geometry: segmentGeom });
                    segmentFeature.set('fraction', (f1 + f2) / 2);
                    segmentFeature.set('gradient', animGradient);
                    
                    animFeatures.push(segmentFeature);
                }
            }
            
            const startCoord = fromLonLat([selectedDrive.route[0][0], selectedDrive.route[0][1]]);
            const endCoord = fromLonLat([selectedDrive.route[selectedDrive.route.length - 1][0], selectedDrive.route[selectedDrive.route.length - 1][1]]);
            
            const homeIconFeature = new Feature({ geometry: new Point(startCoord) });
            homeIconFeature.setStyle(new Style({
                image: new Icon({ src: homeIconUrl, anchor: [0.5, 1], scale: 0.8 }),
                zIndex: 20
            }));
            
            const destIconFeature = new Feature({ geometry: new Point(endCoord) });
            destIconFeature.setStyle(new Style({
                image: new Icon({ src: destIconUrl, anchor: [0.5, 1], scale: 0.8 }),
                zIndex: 20
            }));

            if (reviewedDrive && reviewedDrive.title === selectedDrive.title && selectedDrive.suggestions && selectedDrive.suggestions.length > 0) {
                const totalDuration = parseDuration(selectedDrive.duration);
                if (totalDuration > 0) {
                    const suggestionFeatures: Feature[] = [];
                    const suggestionDotStyle = new Style({
                        image: new CircleStyle({
                            radius: 5,
                            fill: new Fill({ color: '#711ED4' }),
                            stroke: new Stroke({ color: 'white', width: 2 })
                        }),
                        zIndex: 25
                    });

                    selectedDrive.suggestions.forEach((suggestion: any, index: number) => {
                        const progress = suggestion.time / totalDuration;
                        if (progress >= 0 && progress <= 1) {
                            const coord = fullRouteGeom.getCoordinateAt(progress);
                            const dotFeature = new Feature({
                                geometry: new Point(coord)
                            });
                            dotFeature.set('suggestion', suggestion);
                            dotFeature.set('suggestionIndex', index);
                            dotFeature.setStyle(suggestionDotStyle);
                            suggestionFeatures.push(dotFeature);
                        }
                    });
                    suggestionSource.addFeatures(suggestionFeatures);
                }
            }

            staticFeatures.push(homeIconFeature, destIconFeature);

            staticSource.addFeatures(staticFeatures);
            animSource.addFeatures(animFeatures);
            
            if (staticSource.getFeatures().length > 0) {
              const extent = staticSource.getExtent();
              mapRef.current.getView().fit(extent, {
                padding: [80, 80, 80, 80],
                duration: 1000,
                maxZoom: 17,
              });
            }
        }
    }, [selectedDrive, reviewedDrive]);

    const parseDuration = (durationStr: string): number => {
        const minutes = parseInt(durationStr, 10);
        return isNaN(minutes) ? 0 : minutes * 60;
    };
    
    useEffect(() => {
        if (!mapRef.current || !playbackMarkerLayerRef.current || !playbackMarkerFeatureRef.current) return;
        
        if (reviewedDrive && reviewedDrive.route && reviewedDrive.route.length > 1) {
            if (!playbackMarkerLayerRef.current.getVisible()) {
                playbackMarkerLayerRef.current.setVisible(true);
            }

            const totalDuration = parseDuration(reviewedDrive.duration);
            if (totalDuration === 0) return;

            const progress = Math.max(0, Math.min(1, videoTime / totalDuration));

            const routeCoords = reviewedDrive.route.map((p: number[]) => fromLonLat([p[0], p[1]]));
            const routeGeom = new LineString(routeCoords);

            const currentCoord = routeGeom.getCoordinateAt(progress);
            
            const markerGeom = playbackMarkerFeatureRef.current.getGeometry();
            if (markerGeom) {
              markerGeom.setCoordinates(currentCoord);
            }
        } else {
            if (playbackMarkerLayerRef.current.getVisible()) {
                playbackMarkerLayerRef.current.setVisible(false);
            }
        }
    }, [reviewedDrive, videoTime]);

  return (
    <div className="flex-grow relative overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" onClick={() => setContextMenu(null)} />
      
      {clusterPortalElement && createPortal(
        <ClusterPin 
          onSelect={() => onPolygonSelect?.()} 
          showIssues={showIssues}
        />,
        clusterPortalElement
      )}
      
      <AnimatePresence>
        {isDrawingMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-emerald-400/30 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-medium tracking-tight">Drawing Mode Active</span>
              <span className="text-emerald-100/70 text-sm border-l border-emerald-400/30 pl-3">
                Click to add points, double-click to finish
              </span>
            </div>
          </motion.div>
        )}
        {isPOIMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-blue-400/30 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-medium tracking-tight">POI Placement Mode</span>
              <span className="text-blue-100/70 text-sm border-l border-blue-400/30 pl-3">
                Click on the map to place a new POI pin
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {editingPolygonStyle && (
        <PolygonStyleEditor 
          style={editingPolygonStyle}
          onChange={handlePolygonStyleChange}
          onClose={() => setEditingPolygonStyle(null)}
          mapViewSize={mapViewSize}
          initialPosition={initialEditorPosition}
        />
      )}

      {activePinData && activePinIndex !== null && (
        <InfoCard 
            data={activePinData} 
            onClose={closeInfoCard} 
            onNext={handleNextIssue}
            onPrev={handlePrevIssue}
            onRecenter={handleRecenter}
            currentIndex={activePinIndex}
            totalIssues={complexPinsRef.current.length}
            isSnapped={isCardSnapped}
            onSnapChange={setIsCardSnapped}
            mapViewSize={mapViewSize}
        />
      )}
      <RightToolbar 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onToggleLayerPanel={onToggleLayerPanel} 
        onToggleShareModal={onToggleShareModal}
        isShareOpen={isShareModalOpen}
        isChatOpen={isChatOpen && !isChatUndocked}
      />
      <TileRecoveryNotification 
        isVisible={isTileFailure}
        onRefresh={() => {
          setIsTileFailure(false);
          setTimeout(() => {
            if (zoomLevel >= 14) setIsTileFailure(false);
          }, 500);
        }}
        onFallback={() => {
          if (mapRef.current) {
            mapRef.current.getView().animate({
              zoom: 13,
              duration: 500
            });
          }
        }}
        onClose={() => {
          setIsTileFailure(false);
          setHasDismissedFailure(true);
        }}
      />
      <MapFooter 
        coords={coords} 
        zoomLevel={zoomLevel} 
        onOpenDesignSystem={onOpenDesignSystem} 
        onOpenChat={onOpenChat}
      />
       {reviewedDrive && (
          <VideoPlayer 
            drive={reviewedDrive}
            onClose={onCloseVideoPlayer}
            currentTime={videoTime}
            onTimeUpdate={onVideoTimeUpdate}
            mapViewSize={mapViewSize}
            activeSuggestionIndex={activeSuggestionIndex}
            setActiveSuggestionIndex={setActiveSuggestionIndex}
            onSuggestionSelect={handleSuggestionSelect}
          />
      )}
      <ShareLocationModal 
        isOpen={!!isShareModalOpen}
        onClose={() => onToggleShareModal && onToggleShareModal()}
        isChatOpen={isChatOpen && !isChatUndocked}
      />
      <ChatPanel 
        isOpen={!!isChatOpen}
        onClose={() => onOpenChat && onOpenChat()}
        isUndocked={!!isChatUndocked}
        setIsUndocked={setIsChatUndocked}
      />
    </div>
  );
};

export default MapContent;
