import React from "react"
import { HashRouter, Route, Switch } from 'react-router-dom'
import AsyncLoadComponent from '../components/async-load-component';

const Dashboard = AsyncLoadComponent(()=>import('../views/dashboard'))
const Home = AsyncLoadComponent(()=>import('../views/home'))
const Sounimei = AsyncLoadComponent(()=>import('../views/sounimei'))
const Snmdetail = AsyncLoadComponent(()=>import('../views/snmdetail'))
const Snmlist = AsyncLoadComponent(()=>import('../views/snmlist'))
const Teach = AsyncLoadComponent(()=>import('../views/teach'))
const NotFound = AsyncLoadComponent(()=>import('../views/notfound'))

const Routes = (
    <HashRouter>
        <div>
            <Route path="/" render={({ history, location }) => (
                <Dashboard history={history} loacation={location}>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/vip" render={({ history, location }) => (
                            <Sounimei history={history} loacation={location}>
                                <Switch>
                                    <Route exact path="/vip" component={Snmlist} />
                                    <Route path="/vip/vipdetail" component={Snmdetail} />
                                </Switch>
                            </Sounimei>
                        )}>
                        </Route>
                        <Route path="/teach" component={Teach}></Route>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </Dashboard>
            )}>
            </Route>
        </div>
    </HashRouter>
)


export default Routes