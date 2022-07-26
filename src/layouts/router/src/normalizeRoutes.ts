import {MxRoute, MxRoutes} from "./"
import {cloneDeep} from "lodash"
import winPath from "./winPath"
import {join} from "path"

export default function normalizeRoutes(routes: MxRoutes) {
    // 避免修改配置里的 routes，导致重复 patch
    const newRoutes = cloneDeep(routes);
    patchRoutes(newRoutes);
    return newRoutes;
}

function patchRoutes(routes: MxRoutes, parentRoute?:MxRoute) {
    for (const route of routes) {
        patchRoute(route, parentRoute);
    }
}

function patchRoute(route: MxRoute, parentRoute?:MxRoute) {
    // route.path 的修改需要在子路由 patch 之前做
    if (
        route.path &&
        route.path.charAt(0) !== '/' &&
        !/^https?:\/\//.test(route.path)
    ) {
        route.path = winPath(join(parentRoute?.path || '/', route.path));
    }
    if (route.redirect && route.redirect.charAt(0) !== '/') {
        route.redirect = winPath(
            join(parentRoute?.path || '/', route.redirect),
        );
    }

    if (route.routes) {
        patchRoutes(route.routes, route);
    } else {
        if (!('exact' in route)) {
            // exact by default
            route.exact = true;
        }
    }
}