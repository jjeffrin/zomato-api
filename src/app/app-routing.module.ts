import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { AboutRestaurantComponent } from './components/about-restaurant/about-restaurant.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { DiscoverComponent } from './components/discover/discover.component';

const appRoutes: Routes = [
    {
        path: '',
        component: WrapperComponent,
        children: [
            {
                path: '',
                component: RestaurantListComponent
            },
            {
                path: 'discover',
                component: DiscoverComponent
            },
            {
                path: 'aboutRestaurant/:id',
                component: AboutRestaurantComponent,
                children: [
                    {
                        path: '',
                        component: MenuListComponent
                    },
                    {
                        path: 'menu',
                        component: MenuListComponent
                    },
                    {
                        path: 'reviews',
                        component: ReviewListComponent
                    }
                ]
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}