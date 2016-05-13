using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Management;

namespace lab4WMI
{
    public class Searcher
    {
        private string searchKey;
        private string rootCommand = "root\\CIMV2";
        private string Caption = "Caption";
        private string Description = "Description";
        private string Manufacturer = "Manufacturer";
        private string commad = "SELECT * From";
        private ManagementObjectSearcher managementSearcher;
        private string runCommand;
        public Searcher(string searchItemName) {
            this.searchKey = searchItemName;
            this.runCommand = commad + " " + this.searchKey;
        }
        public List<EntityItem> searchItems()
        {
            List<EntityItem> resultList = new List<EntityItem>();
            managementSearcher = new ManagementObjectSearcher(this.rootCommand, this.runCommand);
            try
            {
                foreach (ManagementObject item in managementSearcher.Get())
                {
                    if (item.Properties.Count < 3)
                    {
                        int a = item.Properties.Count;
                    }
                    try
                    {
                        resultList.Add(new EntityItem(item[this.Caption].ToString(), item[this.Description].ToString(), item[this.Manufacturer].ToString()));
                    }
                    catch (Exception e)
                    {
                        resultList.Add(new EntityItem(item[this.Caption].ToString(), item[this.Description].ToString(), ""));
                    }
                }
            }catch(Exception e) { }
           
            return resultList;
        }
    }
}
