﻿namespace lab4WMI
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.tree = new System.Windows.Forms.TreeView();
            this.infoGroup = new System.Windows.Forms.GroupBox();
            this.manufactText = new System.Windows.Forms.Label();
            this.manufactLabel = new System.Windows.Forms.Label();
            this.descrText = new System.Windows.Forms.Label();
            this.labelDescr = new System.Windows.Forms.Label();
            this.captionText = new System.Windows.Forms.Label();
            this.captionLabel = new System.Windows.Forms.Label();
            this.disableButton = new System.Windows.Forms.Button();
            this.infoGroup.SuspendLayout();
            this.SuspendLayout();
            // 
            // tree
            // 
            this.tree.Location = new System.Drawing.Point(12, 12);
            this.tree.Name = "tree";
            this.tree.Size = new System.Drawing.Size(265, 487);
            this.tree.TabIndex = 0;
            this.tree.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(this.tree_AfterSelect);
            // 
            // infoGroup
            // 
            this.infoGroup.Controls.Add(this.disableButton);
            this.infoGroup.Controls.Add(this.manufactText);
            this.infoGroup.Controls.Add(this.manufactLabel);
            this.infoGroup.Controls.Add(this.descrText);
            this.infoGroup.Controls.Add(this.labelDescr);
            this.infoGroup.Controls.Add(this.captionText);
            this.infoGroup.Controls.Add(this.captionLabel);
            this.infoGroup.Location = new System.Drawing.Point(283, 12);
            this.infoGroup.Name = "infoGroup";
            this.infoGroup.Size = new System.Drawing.Size(317, 487);
            this.infoGroup.TabIndex = 1;
            this.infoGroup.TabStop = false;
            this.infoGroup.Text = "Info";
            this.infoGroup.Visible = false;
            // 
            // manufactText
            // 
            this.manufactText.AutoSize = true;
            this.manufactText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.manufactText.Location = new System.Drawing.Point(22, 167);
            this.manufactText.Name = "manufactText";
            this.manufactText.Size = new System.Drawing.Size(64, 16);
            this.manufactText.TabIndex = 5;
            this.manufactText.Text = "manuftext";
            // 
            // manufactLabel
            // 
            this.manufactLabel.AutoSize = true;
            this.manufactLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.manufactLabel.Location = new System.Drawing.Point(22, 142);
            this.manufactLabel.Name = "manufactLabel";
            this.manufactLabel.Size = new System.Drawing.Size(88, 16);
            this.manufactLabel.TabIndex = 4;
            this.manufactLabel.Text = "Manufacturer:";
            // 
            // descrText
            // 
            this.descrText.AutoSize = true;
            this.descrText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.descrText.Location = new System.Drawing.Point(22, 105);
            this.descrText.Name = "descrText";
            this.descrText.Size = new System.Drawing.Size(62, 16);
            this.descrText.TabIndex = 3;
            this.descrText.Text = "descrtext";
            // 
            // labelDescr
            // 
            this.labelDescr.AutoSize = true;
            this.labelDescr.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.labelDescr.Location = new System.Drawing.Point(22, 80);
            this.labelDescr.Name = "labelDescr";
            this.labelDescr.Size = new System.Drawing.Size(79, 16);
            this.labelDescr.TabIndex = 2;
            this.labelDescr.Text = "Description:";
            // 
            // captionText
            // 
            this.captionText.AutoSize = true;
            this.captionText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.captionText.Location = new System.Drawing.Point(22, 41);
            this.captionText.Name = "captionText";
            this.captionText.Size = new System.Drawing.Size(72, 16);
            this.captionText.TabIndex = 1;
            this.captionText.Text = "captiontext";
            // 
            // captionLabel
            // 
            this.captionLabel.AutoSize = true;
            this.captionLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.captionLabel.Location = new System.Drawing.Point(22, 16);
            this.captionLabel.Name = "captionLabel";
            this.captionLabel.Size = new System.Drawing.Size(57, 16);
            this.captionLabel.TabIndex = 0;
            this.captionLabel.Text = "Caption:";
            // 
            // disableButton
            // 
            this.disableButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.disableButton.Location = new System.Drawing.Point(25, 219);
            this.disableButton.Name = "disableButton";
            this.disableButton.Size = new System.Drawing.Size(91, 34);
            this.disableButton.TabIndex = 6;
            this.disableButton.Text = "Disable";
            this.disableButton.UseVisualStyleBackColor = true;
            this.disableButton.Click += new System.EventHandler(this.disableButton_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(612, 511);
            this.Controls.Add(this.infoGroup);
            this.Controls.Add(this.tree);
            this.Name = "Form1";
            this.Text = "Device Manager";
            this.infoGroup.ResumeLayout(false);
            this.infoGroup.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TreeView tree;
        private System.Windows.Forms.GroupBox infoGroup;
        private System.Windows.Forms.Label manufactText;
        private System.Windows.Forms.Label manufactLabel;
        private System.Windows.Forms.Label descrText;
        private System.Windows.Forms.Label labelDescr;
        private System.Windows.Forms.Label captionText;
        private System.Windows.Forms.Label captionLabel;
        private System.Windows.Forms.Button disableButton;
    }
}

