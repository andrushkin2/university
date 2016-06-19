using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    public class EntityItem
    {
        public string Caption;
        public string Description;
        public string id;
        public string isInstallDrivers;
        public string type;
        public string Manufacturer;
        private bool isEmpty = true;
        public EntityItem()
        {
            this.isEmpty = true;
        }
        public EntityItem(string Caption, string Description, string Manufacturer)
        {
            this.Caption = Caption.Trim();
            this.Description = Description.Trim();
            this.Manufacturer = Manufacturer.Trim();
            this.isEmpty = false;
        }
        public EntityItem(string Caption, string Description, string Manufacturer, string id, string type, string isInstallDriver)
        {
            this.Caption = Caption;
            this.Description = Description;
            this.Manufacturer = Manufacturer;
            this.id = id;
            this.type = type;
            this.isInstallDrivers = isInstallDriver;
            this.isEmpty = false;
        }
        public bool isEmptyClass()
        {
            return this.isEmpty;
        }
    }
}
