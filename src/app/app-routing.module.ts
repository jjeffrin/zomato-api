import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { AboutRestaurantComponent } from './components/about-restaurant/about-restaurant.component';

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
                path: 'aboutRestaurant/:id',
                component: AboutRestaurantComponent
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