import { Link, useLocation } from 'react-router'
import { MENU_LIST } from '~/const/app';



export default function Navigator () {
  
   const location = useLocation()
  return (
    <header className='fixed  z-[99] top-0 w-full  px-4 mx-auto bg-white shadow'>
      <nav className='box-container py-4 flex items-center justify-between w-full'>
        {/* logo */}
        <div className='md:w-[60px] w-[40px]'>
          <Link to="/">
          {/* <img src='/logo.png' alt='creative tour logo' /> */}
          Logo
          </Link> 
        </div>
        {/* menu */}
        <div className='md:flex hidden mc-hd items-center gap-5 text-sm'>
          <div className='flex gap-5 nav-item items-center '>
            {MENU_LIST.map(menu =>  location.pathname === menu.path ? (
              <Link to={menu.path} className='nav-lnk-active' key={menu.name}> {(menu.name)}</Link>
            ) : 
            (
              <Link to={menu.path} className='nav-lnk ' key={menu.name}> {(menu.name)}</Link>
            )
          )}
          </div>
          {/* Lang */}
          {/* <div className='rounded-full size-[40px] bg-[var(--primary-color)] '>
            <LangSelector />
           
          </div> */}
          {/* CTA */}
          <Link to="/book"
            className='font-medium h-[40px] w-[100px] bg-[var(--primary-color)] 
            text-black/80 flex items-center justify-center rounded-xl'
          >
            {("Book Now")}
          </Link>

           
        </div>
        {/* <Drawer /> */}
      </nav>
    </header>
  )
}
