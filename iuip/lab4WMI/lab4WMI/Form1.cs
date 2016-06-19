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
                captionText.Text = item.Caption;
                driverText.Text = item.isInstallDrivers;
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
