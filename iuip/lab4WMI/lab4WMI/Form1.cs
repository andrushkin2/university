using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace lab4WMI
{
    public partial class Form1 : Form
    {
        private Menu menu = new Menu();
        MenuObject[] menuObjects = {
            //new MenuObject("PnP", new string[]{ WMIEntityName.PlugAndPlay }),
            new MenuObject("System Enclosure", new string[]{ WMIEntityName.SystemEnclosure }),
            new MenuObject("System board", new string[]{ WMIEntityName.BaseBoard, WMIEntityName.MotherboardDevice, WMIEntityName.MotherboardOnBoardDevice, WMIEntityName.MotherboardBus, WMIEntityName.SystemSlot }),
            new MenuObject("Processors", new string[]{ WMIEntityName.Processor, WMIEntityName.CacheMemory }),
            new MenuObject("Memory", new string[]{ WMIEntityName.PhysicalMemory, WMIEntityName.MemoryDevice, WMIEntityName.MemoryArray, WMIEntityName.PhysicalMemoryArray, WMIEntityName.DMAChannel }),
            new MenuObject("Ports", new string[]{ WMIEntityName.PortConnector, WMIEntityName.SerialPort }),
            new MenuObject("Keyboard", new string[]{ WMIEntityName.Keyboard }),
            new MenuObject("Mouse", new string[]{ WMIEntityName.PointingDevice }),
            new MenuObject("Audio", new string[]{ WMIEntityName.SoundDevice }),
            new MenuObject("Video", new string[]{ WMIEntityName.VideoController, WMIEntityName.CIMVideoControllerResolution }),
            new MenuObject("Network", new string[]{ WMIEntityName.NetworkAdapter, WMIEntityName.NetworkAdapterConfiguration }),
            new MenuObject("Monitor", new string[]{ WMIEntityName.DesktopMonitor }),
            new MenuObject("Floppy drive", new string[]{ WMIEntityName.FloppyDrive }),
            new MenuObject("Disk drives", new string[]{ WMIEntityName.DiskDrive }),
            new MenuObject("CD-ROM", new string[]{ WMIEntityName.CDROMDrive })
        };
        public Form1()
        {
            InitializeComponent();
            initMenu();
            updateTree();
        }
        private void initMenu()
        {
            menu = new Menu();
            for (int i = 0; i < menuObjects.Length; i++)
            {
                menu.addMenuItem(menuObjects[i]);
            }
        }
        private void updateTree()
        {
            tree.Nodes.Clear();
            List<MenuItem> menuItems = menu.getMenuItems();
            foreach(MenuItem menuItem in menuItems)
            {
                TreeNode menuNode = new TreeNode(menuItem.menuName);
                List<EntityItem> subMenus = menuItem.getMenuItems();
                foreach(EntityItem subMenu in subMenus)
                {
                    menuNode.Nodes.Add(subMenu.Caption);
                }
                tree.Nodes.Add(menuNode);
            }
        }

        private void tree_AfterSelect(object sender, TreeViewEventArgs e)
        {
            if (e.Node.Parent != null)
            {
                EntityItem item = menu.getEntityItemInMenuItem(e.Node.Parent.Text, e.Node.Text);
                if (item.isEmptyClass())
                {
                    return;
                }
                captionText.Text = item.Caption;
                descrText.Text = item.Description;
                if (item.Manufacturer != "")
                {
                    manufactText.Text = item.Manufacturer;
                    manufactText.Visible = true;
                    manufactLabel.Visible = true;
                } else
                {
                    manufactText.Visible = false;
                    manufactLabel.Visible = false;
                }
               
                infoGroup.Visible = true;

            } else
            {
                infoGroup.Visible = false;
            }
        }

        private void disableButton_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Device  successfully disabled");
        }
    }
}
