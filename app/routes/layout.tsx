import React from 'react'
import { Outlet } from 'react-router'
import Footer from '~/components/footer'
import Header from '~/components/header'
import NavigationMenuBase from '~/components/navigator'
import SidebarMenu from '~/components/sidebar'
import { menuItems } from '~/const/app'

export default function Layout() {
    return (
        <main>
            <SidebarMenu />
            {/* <NavigationMenuBase items={menuItems} /> */}
            {/* <Header /> */}
            <Outlet />

            <Footer />
        </main>
    )
}
