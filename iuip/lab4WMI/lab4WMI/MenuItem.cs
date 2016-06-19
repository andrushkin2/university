using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    public class MenuItem
    {
        public string menuName;
        private bool isEmpty = true;
        private List<EntityItem> entities = new List<EntityItem>();
        public MenuItem()
        {
            this.isEmpty = true;
        }
        public MenuItem(string menuName, EntityItem item)
        {
            this.menuName = menuName;
            entities = new List<EntityItem>();
            addItem(item);
            this.isEmpty = false;
        }
        public bool isEmptyClass()
        {
            return this.isEmpty;
        }
        public void addItem(EntityItem newItem)
        {
            if (!newItem.isEmptyClass())
            {
                entities.Add(newItem);
            }
        }
        public List<EntityItem> getMenuItems()
        {
            return entities;
        }
        public EntityItem getMenuItemByCaption(string name)
        {
            List<EntityItem> items = getMenuItems();
            foreach(EntityItem item in items)
            {
                if (item.Caption == name)
                {
                    return item;
                }
            }
            return new EntityItem();
        }
    }
}
