import AsyncLoad from '../components/async-load-component'
export default[
    {
        path : '/',
        exact : true,
        name : 'home',
        component : AsyncLoad(() => import ('../views/home'))
    },
    {
        path : '/detail',
        exact : true,
        name : 'home',
        component : AsyncLoad(() => import ('../views/detail'))
    }
]