using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    public class MenuObject
    {
        public string menuName;
        public string[] menuItems;
        public MenuObject(string menuName, string[] menuItems)
        {
            this.menuName = menuName;
            this.menuItems = menuItems;
        }
    }
}
