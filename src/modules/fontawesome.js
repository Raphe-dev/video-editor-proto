import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//Solid
import {
    faAddressCard,
    faMapMarkerAlt,
    faFileAlt,
    faShareSquare,
    faBroadcastTower,
    faPalette,
    faFont,
    faItalic, faBold, faUnderline,
    faTextHeight,
    faSuperscript,
    faSearch,
    faFilter,
    faList,
    faBars,
    faCloudDownloadAlt,
    faCopy,
    faClone,
    faTrash,
    faFolder, faFolderOpen, faFolderPlus,
    faFileImage, faFileVideo, faFileAudio,
    faVideo,
    faCaretRight,
    faUser, faUserCog,
    faBell,
    faThLarge, faTh,
    faExpand, faExpandAlt,
    faExpandArrowsAlt, faArrowsAltH, faArrowsAltV,
    faRulerCombined, faRuler,
    faVectorSquare,
    faSquare, faStar, faCircle, faSlash,
    faObjectGroup, faObjectUngroup,
    faAlignJustify, faAlignRight, faAlignLeft, faAlignCenter,
    faUndo, faRedo,
    faDraftingCompass,
    faLayerGroup,
    faCropAlt,
    faEyeDropper,
    faImage, faFilm,
    faCog, faCogs, faWrench, faTools,
    faCrosshairs,
    faEllipsisH, faEllipsisV,
    faLink, faGlobe,
    faQuestionCircle,
    faPlayCircle, faPlay,
    faBriefcaseMedical,
    faTooth,
    faQuoteRight,
    faPen,
    faVolumeUp,
    faStopwatch,
    faGlobeAmericas,
    faCloudSun, faThermometerThreeQuarters,
    faCity,
    faChevronDown, faChevronRight,
    faSave, faPlus,
    faCircleNotch,
    faFastForward, faFastBackward,
    faCamera,
    faGripLinesVertical,
    faEye, faEyeSlash,
    faLock, faLockOpen

} from '@fortawesome/free-solid-svg-icons';

library.add(
    faAddressCard,
    faMapMarkerAlt,
    faFileAlt,
    faShareSquare,
    faBroadcastTower,
    faPalette,
    faItalic, faBold, faUnderline,
    faTextHeight,
    faFont,
    faSearch,
    faFilter,
    faList,
    faBars,
    faCloudDownloadAlt,
    faCopy,
    faSuperscript,
    faClone,
    faTrash,
    faFolder, faFolderOpen, faFolderPlus,
    faFileImage, faFileVideo, faFileAudio,
    faVideo,
    faCaretRight,
    faUser, faUserCog,
    faBell,
    faThLarge, faTh,
    faExpand, faExpandAlt,
    faExpandArrowsAlt, faArrowsAltH, faArrowsAltV,
    faRulerCombined, faRuler,
    faVectorSquare,
    faSquare, faStar, faCircle, faSlash,
    faObjectGroup, faObjectUngroup,
    faAlignJustify, faAlignRight, faAlignLeft, faAlignCenter,
    faUndo, faRedo,
    faDraftingCompass,
    faLayerGroup,
    faCropAlt,
    faEyeDropper,
    faImage, faFilm,
    faCog, faCogs, faWrench, faTools,
    faCrosshairs,
    faEllipsisH, faEllipsisV,
    faLink, faGlobe,
    faQuestionCircle,
    faPlayCircle, faPlay,
    faBriefcaseMedical,
    faTooth,
    faQuoteRight,
    faPen,
    faVolumeUp,
    faStopwatch,
    faGlobeAmericas,
    faCloudSun, faThermometerThreeQuarters,
    faCity,
    faChevronDown, faChevronRight,
    faSave, faPlus,
    faCircleNotch,
    faFastForward, faFastBackward,
    faCamera,
    faGripLinesVertical,
    faEye, faEyeSlash,
    faLock, faLockOpen
);

//Regular
import {
    faSquare as faSquareReg,
    faCheckSquare as faCheckSquareReg,
    faCommentAlt as faCommentAltReg,
    faCircle as faCircleReg,
    faDotCircle as faDotCircleReg
} from '@fortawesome/free-regular-svg-icons';

library.add(
    faSquareReg,
    faCheckSquareReg,
    faCommentAltReg,
    faCircleReg,
    faDotCircleReg
);

//Brands
import {
    faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
    faYoutube
);

//Custom
import {
    faBorderRadius,
    faBorderSpacing,
    faFontWeight,
    faTextTop,
    faTextCenter,
    faTextBottom,
    faOpacity,
    faTouch,
    faPositionLeft, faPositionTop
} from './customIcons';

library.add(
    faBorderRadius,
    faBorderSpacing,
    faFontWeight,
    faOpacity,
    faTextTop, faTextCenter, faTextBottom,
    faTouch,
    faPositionLeft, faPositionTop

);
Vue.component('fa-icon', FontAwesomeIcon);
