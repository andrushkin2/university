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
        private string[] childNames;
        private bool isEmpty = true;
        private List<Searcher> searcherList;
        public MenuItem()
        {
            this.isEmpty = true;
        }
        public MenuItem(string menuName, string [] childNames)
        {
            this.menuName = menuName;
            this.childNames = childNames;
            searcherList = new List<Searcher>();
            for (int i = 0; i < this.childNames.Length; i++)
            {
                searcherList.Add(new Searcher(this.childNames[i]));
            }
            this.isEmpty = false;
        }
        public bool isEmptyClass()
        {
            return this.isEmpty;
        }
        public List<EntityItem> getMenuItems()
        {
            List<EntityItem> items = new List<EntityItem>();
            foreach (Searcher item in searcherList)
            {
                items.AddRange(item.searchItems());
            }
            return items;
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
