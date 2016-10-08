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
        public Form1()
        {
            InitializeComponent();
            initMenu();
            
            updateTree();
        }
        private void initMenu()
        {
            menu = new Menu();
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
                outputBox.Clear();
                outputBox.Text += "Caption:\r\n\t" + item.Caption + "\r\n";
                if (item.friendName != "" && item.friendName != item.Caption)
                {
                    outputBox.Text += "Friedly name:\r\n\t" + item.friendName + "\r\n";
                }
                if (item.Manufacturer != "")
                {
                    outputBox.Text += "Manufacturer:\r\n\t" + item.Manufacturer + "\r\n";
                }
                if (item.Description != "")
                {
                    outputBox.Text += "Description:\r\n\t" + item.Description + "\r\n";
                }
                if (item.isInstall != "")
                {
                    outputBox.Text += "Is install:\r\n\t" + item.isInstall + "\r\n";
                }
                if (item.isInstallDrivers != "")
                {
                    outputBox.Text += "Is install drivers:\r\n\t" + item.isInstallDrivers + "\r\n";
                }
                if (item.location != "")
                {
                    outputBox.Text += "Location info:\r\n\t" + item.location + "\r\n";
                }
                if (item.hardwareId != "")
                {
                    outputBox.Text += "Hardware ID:\r\n\t" + item.hardwareId + "\r\n";
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
            TreeNode selectedItem = tree.SelectedNode;
            if (selectedItem.Parent != null)
            {
                EntityItem item = menu.getEntityItemInMenuItem(selectedItem.Parent.Text, selectedItem.Text);
                if (item.isEmptyClass())
                {
                    return;
                }
                //bool res = Diactivate.DisableDevice(item.data, false);
            }
        }
    }
}
