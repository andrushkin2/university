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
        public string friendName;
        public string Description;
        public string id;
        public string isInstallDrivers;
        public string type;
        public string classGuid;
        public string Manufacturer;
        public string isInstall;
        public string location;
        public DeviceInfo.SP_DEVINFO_DATA data;
        public string hardwareId;
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
        public EntityItem(string Caption, string Description, string Manufacturer, 
            string id, string type, string isInstallDriver, string classGuid, 
            string friendName, string inInstall, string location, string hardware, DeviceInfo.SP_DEVINFO_DATA data)
        {
            this.Caption = Caption;
            this.Description = Description;
            this.Manufacturer = Manufacturer;
            this.id = id;
            this.type = type;
            this.isInstallDrivers = isInstallDriver;
            this.classGuid = classGuid;
            this.friendName = friendName;
            this.isInstall = inInstall;
            this.location = location;
            this.data = data;
            this.hardwareId = hardware;
            this.isEmpty = false;
        }
        public bool isEmptyClass()
        {
            return this.isEmpty;
        }
    }
}
