import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faChartPie,faCopy,faCarSide,faShip,faGlobe,
    faRightFromBracket,faPencil,faBars, faTrash,faPlus, faEnvelope, faReply,faArrowUpRightFromSquare, faImages, faLocationArrow, faAnglesLeft, faClipboardList, faChevronDown, faChevronRight, faGear

} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faChartPie,faCopy,faCarSide, faShip, faGlobe, faRightFromBracket,faPencil,
faBars, faTrash, faPlus, faEnvelope, faReply, faArrowUpRightFromSquare,faImages,
faLocationArrow, faAnglesLeft, faClipboardList,faChevronRight,faGear)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)



// const instance = axios.create({
//     baseURL: "http://localhost:1337/",
//     withCredentials: false,
//     headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//        // Accept: 'application/json',
//     }

 
//  })

 
// app.config.globalProperties.axios = instance;

app.use(createPinia())
app.use(router)
app.mount('#app')
