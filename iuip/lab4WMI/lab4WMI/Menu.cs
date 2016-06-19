using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    public class Menu
    {
        private List<MenuItem> menuItems = new List<MenuItem>();
        public Menu()
        {
            int length, i;
            menuItems.Clear();
            List<string> namesList = new List<string>();
            List<string> idList = new List<string>();
            List<string> mfgList = new List<string>();
            List<string> typesList = new List<string>();
            List<string> isInstallList = new List<string>();
            DeviceInfo.EnumerateDevices(namesList, idList, mfgList, typesList, isInstallList);
            length = namesList.Count();
            for (i = 0; i < length; i++)
            {
                EntityItem item = new EntityItem(namesList[i], "", mfgList[i], idList[i], typesList[i], isInstallList[i]);
                MenuItem mItem = getMenuItemByName(item.type);
                if (mItem.isEmptyClass())
                {
                    menuItems.Add(new MenuItem(item.type, item));
                } else
                {
                    mItem.addItem(item);
                }
            }
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
