namespace lab1
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
            this.components = new System.ComponentModel.Container();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.textBox_R0 = new System.Windows.Forms.TextBox();
            this.textBox_m = new System.Windows.Forms.TextBox();
            this.textBox_a = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.calculateButton = new System.Windows.Forms.Button();
            this.textBox_Dx = new System.Windows.Forms.TextBox();
            this.textBox_Mx = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.textBox_pi_4 = new System.Windows.Forms.TextBox();
            this.textBox_2kn = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.textBox_no_period = new System.Windows.Forms.TextBox();
            this.textBox_period = new System.Windows.Forms.TextBox();
            this.label10 = new System.Windows.Forms.Label();
            this.zedGraphControl1 = new ZedGraph.ZedGraphControl();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.textBox_R0);
            this.groupBox1.Controls.Add(this.textBox_m);
            this.groupBox1.Controls.Add(this.textBox_a);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.calculateButton);
            this.groupBox1.Location = new System.Drawing.Point(12, 12);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(186, 162);
            this.groupBox1.TabIndex = 1;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Start data:";
            // 
            // textBox_R0
            // 
            this.textBox_R0.Location = new System.Drawing.Point(43, 73);
            this.textBox_R0.Name = "textBox_R0";
            this.textBox_R0.Size = new System.Drawing.Size(100, 20);
            this.textBox_R0.TabIndex = 5;
            this.textBox_R0.Text = "1";
            // 
            // textBox_m
            // 
            this.textBox_m.Location = new System.Drawing.Point(43, 47);
            this.textBox_m.Name = "textBox_m";
            this.textBox_m.Size = new System.Drawing.Size(100, 20);
            this.textBox_m.TabIndex = 4;
            this.textBox_m.Text = "123121";
            // 
            // textBox_a
            // 
            this.textBox_a.Location = new System.Drawing.Point(43, 21);
            this.textBox_a.Name = "textBox_a";
            this.textBox_a.Size = new System.Drawing.Size(100, 20);
            this.textBox_a.TabIndex = 3;
            this.textBox_a.Text = "66";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(6, 76);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(33, 13);
            this.label3.TabIndex = 2;
            this.label3.Text = "R0 = ";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 52);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(27, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "m = ";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 24);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(25, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "a = ";
            // 
            // calculateButton
            // 
            this.calculateButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.calculateButton.Location = new System.Drawing.Point(43, 120);
            this.calculateButton.Name = "calculateButton";
            this.calculateButton.Size = new System.Drawing.Size(100, 36);
            this.calculateButton.TabIndex = 14;
            this.calculateButton.Text = "Run";
            this.calculateButton.UseVisualStyleBackColor = true;
            this.calculateButton.Click += new System.EventHandler(this.calculateButton_Click);
            // 
            // textBox_Dx
            // 
            this.textBox_Dx.Location = new System.Drawing.Point(305, 53);
            this.textBox_Dx.Name = "textBox_Dx";
            this.textBox_Dx.ReadOnly = true;
            this.textBox_Dx.Size = new System.Drawing.Size(185, 20);
            this.textBox_Dx.TabIndex = 10;
            // 
            // textBox_Mx
            // 
            this.textBox_Mx.Location = new System.Drawing.Point(305, 16);
            this.textBox_Mx.Name = "textBox_Mx";
            this.textBox_Mx.ReadOnly = true;
            this.textBox_Mx.Size = new System.Drawing.Size(185, 20);
            this.textBox_Mx.TabIndex = 9;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(267, 56);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(32, 13);
            this.label5.TabIndex = 7;
            this.label5.Text = "Dx = ";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(266, 19);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(33, 13);
            this.label6.TabIndex = 6;
            this.label6.Text = "Mx = ";
            // 
            // textBox_pi_4
            // 
            this.textBox_pi_4.Location = new System.Drawing.Point(305, 132);
            this.textBox_pi_4.Name = "textBox_pi_4";
            this.textBox_pi_4.ReadOnly = true;
            this.textBox_pi_4.Size = new System.Drawing.Size(185, 20);
            this.textBox_pi_4.TabIndex = 11;
            this.textBox_pi_4.Text = "0,7853981633974483096156608458\r\n";
            // 
            // textBox_2kn
            // 
            this.textBox_2kn.Location = new System.Drawing.Point(305, 92);
            this.textBox_2kn.Name = "textBox_2kn";
            this.textBox_2kn.ReadOnly = true;
            this.textBox_2kn.Size = new System.Drawing.Size(185, 20);
            this.textBox_2kn.TabIndex = 10;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Times New Roman", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.Location = new System.Drawing.Point(261, 134);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(38, 16);
            this.label7.TabIndex = 8;
            this.label7.Text = "π/4 =";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(254, 96);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(45, 13);
            this.label8.TabIndex = 7;
            this.label8.Text = "2K/N = ";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(522, 97);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(52, 13);
            this.label9.TabIndex = 12;
            this.label9.Text = "Aperiod =";
            // 
            // textBox_no_period
            // 
            this.textBox_no_period.Location = new System.Drawing.Point(580, 94);
            this.textBox_no_period.Name = "textBox_no_period";
            this.textBox_no_period.ReadOnly = true;
            this.textBox_no_period.Size = new System.Drawing.Size(184, 20);
            this.textBox_no_period.TabIndex = 11;
            // 
            // textBox_period
            // 
            this.textBox_period.Location = new System.Drawing.Point(579, 57);
            this.textBox_period.Name = "textBox_period";
            this.textBox_period.ReadOnly = true;
            this.textBox_period.Size = new System.Drawing.Size(185, 20);
            this.textBox_period.TabIndex = 10;
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(527, 60);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(46, 13);
            this.label10.TabIndex = 7;
            this.label10.Text = "Period =";
            this.label10.Click += new System.EventHandler(this.label10_Click);
            // 
            // zedGraphControl1
            // 
            this.zedGraphControl1.IsEnableHPan = false;
            this.zedGraphControl1.IsEnableHZoom = false;
            this.zedGraphControl1.IsEnableVPan = false;
            this.zedGraphControl1.IsEnableVZoom = false;
            this.zedGraphControl1.IsShowContextMenu = false;
            this.zedGraphControl1.Location = new System.Drawing.Point(12, 180);
            this.zedGraphControl1.Name = "zedGraphControl1";
            this.zedGraphControl1.ScrollGrace = 0D;
            this.zedGraphControl1.ScrollMaxX = 0D;
            this.zedGraphControl1.ScrollMaxY = 0D;
            this.zedGraphControl1.ScrollMaxY2 = 0D;
            this.zedGraphControl1.ScrollMinX = 0D;
            this.zedGraphControl1.ScrollMinY = 0D;
            this.zedGraphControl1.ScrollMinY2 = 0D;
            this.zedGraphControl1.Size = new System.Drawing.Size(776, 254);
            this.zedGraphControl1.TabIndex = 15;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.ClientSize = new System.Drawing.Size(800, 446);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.textBox_no_period);
            this.Controls.Add(this.textBox_pi_4);
            this.Controls.Add(this.label10);
            this.Controls.Add(this.textBox_period);
            this.Controls.Add(this.zedGraphControl1);
            this.Controls.Add(this.textBox_2kn);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.textBox_Dx);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.textBox_Mx);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.groupBox1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.Text = "Lab #1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.TextBox textBox_R0;
        private System.Windows.Forms.TextBox textBox_m;
        private System.Windows.Forms.TextBox textBox_a;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBox_Dx;
        private System.Windows.Forms.TextBox textBox_Mx;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox textBox_pi_4;
        private System.Windows.Forms.TextBox textBox_2kn;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.TextBox textBox_no_period;
        private System.Windows.Forms.TextBox textBox_period;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Button calculateButton;
        private ZedGraph.ZedGraphControl zedGraphControl1;
    }
}

