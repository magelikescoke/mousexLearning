import dynamic from 'dw-mx-dynamic';

export default {
    'homeindex': dynamic(() => import('../pages/home/homepage/HomeIndex')),
    // 'demo': dynamic(() => import('../pages/home/Home')),
    'personalInfo': dynamic(() => import('../pages/business/person/PersonInfoMain')),
    'demoTest': dynamic(() => import('../pages/DemoTest')),
    'selectSearchDemo': dynamic(() => import('../pages/SelectSearchDemo')),
    'formExercise': dynamic(() => import('../pages/FormExercise')),
    'tabsTest': dynamic(() => import('../pages/TabsTest')),
    'tableTest': dynamic(() => import('../pages/TableTest')),
    'tableExercise': dynamic(() => import('../pages/TableExercise')),
    'modalTest': dynamic(() => import('../pages/ModalTest')),
    'lovTest': dynamic(() => import('../pages/LovTest')),
    'treeTest': dynamic(() => import('../pages/TreeTest')),
    'modalExercise': dynamic(() => import('../pages/modalExercise/ModalExercise')),
    'generalExercise1': dynamic(() => import('../pages/general/GeneralExercise1')),
    'personInfoQueryMain': dynamic(() => import('../pages/exercise2/PersonInfoQueryMain')),
    'wxlPDFPreview': dynamic(() => import('../pages/pdf/WxlPDFPreview')),
    
};
