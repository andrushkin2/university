using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    class Menu
    {
        private List<MenuItem> menuItems = new List<MenuItem>();
        public bool addMenuItem(MenuObject menuObj)
        {
            if (menuObj.menuName == "" || menuObj.menuItems.Length < 1)
            {
                return false;
            }
            menuItems.Add(new MenuItem(menuObj.menuName, menuObj.menuItems));
            return true;
        }
        public bool addMenuItem(string menuName, string[] itemNames)
        {
            if (menuName == "" || itemNames.Length < 1)
            {
                return false;
            }
            menuItems.Add(new MenuItem(menuName, itemNames));
            return true;
        }
        public MenuItem getMenuItemByName(string menuName)
        {
            foreach(MenuItem item in menuItems)
            {
                if (item.menuName == menuName)
                {
                    return item;
                }
            }
            return new MenuItem();
        }
        public List<MenuItem> getMenuItems()
        {
            return menuItems;
        }
        public EntityItem getEntityItemInMenuItem(string menuName, string subMenuName)
        {
            MenuItem menu = getMenuItemByName(menuName);
            EntityItem emptyClass = new EntityItem();
            if (!menu.isEmptyClass())
            {
                EntityItem subMenu = menu.getMenuItemByCaption(subMenuName);
                if (subMenu.isEmptyClass())
                {
                    return emptyClass;
                } else
                {
                    return subMenu;
                }
            } else
            {
                return emptyClass;
            }
        }
    }
}
