namespace lab2
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
            this.zedGraphControl1 = new ZedGraph.ZedGraphControl();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.uniform = new System.Windows.Forms.TabPage();
            this.gauss = new System.Windows.Forms.TabPage();
            this.unA = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.uniformB = new System.Windows.Forms.Label();
            this.unB = new System.Windows.Forms.TextBox();
            this.uniformN = new System.Windows.Forms.Label();
            this.unN = new System.Windows.Forms.TextBox();
            this.label6 = new System.Windows.Forms.Label();
            this.gaM = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            this.gaA = new System.Windows.Forms.TextBox();
            this.label8 = new System.Windows.Forms.Label();
            this.gaN = new System.Windows.Forms.TextBox();
            this.label9 = new System.Windows.Forms.Label();
            this.gaC = new System.Windows.Forms.TextBox();
            this.exponential = new System.Windows.Forms.TabPage();
            this.gamma = new System.Windows.Forms.TabPage();
            this.triangle = new System.Windows.Forms.TabPage();
            this.simpson = new System.Windows.Forms.TabPage();
            this.label10 = new System.Windows.Forms.Label();
            this.expA = new System.Windows.Forms.TextBox();
            this.label11 = new System.Windows.Forms.Label();
            this.expCount = new System.Windows.Forms.TextBox();
            this.label12 = new System.Windows.Forms.Label();
            this.gamA = new System.Windows.Forms.TextBox();
            this.label13 = new System.Windows.Forms.Label();
            this.gamN = new System.Windows.Forms.TextBox();
            this.label14 = new System.Windows.Forms.Label();
            this.gamCount = new System.Windows.Forms.TextBox();
            this.label15 = new System.Windows.Forms.Label();
            this.trA = new System.Windows.Forms.TextBox();
            this.label16 = new System.Windows.Forms.Label();
            this.trB = new System.Windows.Forms.TextBox();
            this.label17 = new System.Windows.Forms.Label();
            this.trCount = new System.Windows.Forms.TextBox();
            this.label18 = new System.Windows.Forms.Label();
            this.siA = new System.Windows.Forms.TextBox();
            this.label19 = new System.Windows.Forms.Label();
            this.siB = new System.Windows.Forms.TextBox();
            this.label20 = new System.Windows.Forms.Label();
            this.siCount = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            this.button4 = new System.Windows.Forms.Button();
            this.button5 = new System.Windows.Forms.Button();
            this.button6 = new System.Windows.Forms.Button();
            this.labelMx = new System.Windows.Forms.Label();
            this.labelDx = new System.Windows.Forms.Label();
            this.label_sko = new System.Windows.Forms.Label();
            this.textBox_Mx = new System.Windows.Forms.TextBox();
            this.textBox_Dx = new System.Windows.Forms.TextBox();
            this.textBox_sko = new System.Windows.Forms.TextBox();
            this.tabControl1.SuspendLayout();
            this.uniform.SuspendLayout();
            this.gauss.SuspendLayout();
            this.exponential.SuspendLayout();
            this.gamma.SuspendLayout();
            this.triangle.SuspendLayout();
            this.simpson.SuspendLayout();
            this.SuspendLayout();
            // 
            // zedGraphControl1
            // 
            this.zedGraphControl1.IsEnableHPan = false;
            this.zedGraphControl1.IsEnableHZoom = false;
            this.zedGraphControl1.IsEnableVPan = false;
            this.zedGraphControl1.IsEnableVZoom = false;
            this.zedGraphControl1.IsShowContextMenu = false;
            this.zedGraphControl1.Location = new System.Drawing.Point(23, 162);
            this.zedGraphControl1.Name = "zedGraphControl1";
            this.zedGraphControl1.ScrollGrace = 0D;
            this.zedGraphControl1.ScrollMaxX = 0D;
            this.zedGraphControl1.ScrollMaxY = 0D;
            this.zedGraphControl1.ScrollMaxY2 = 0D;
            this.zedGraphControl1.ScrollMinX = 0D;
            this.zedGraphControl1.ScrollMinY = 0D;
            this.zedGraphControl1.ScrollMinY2 = 0D;
            this.zedGraphControl1.Size = new System.Drawing.Size(634, 284);
            this.zedGraphControl1.TabIndex = 16;
            this.zedGraphControl1.UseExtendedPrintDialog = true;
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.uniform);
            this.tabControl1.Controls.Add(this.gauss);
            this.tabControl1.Controls.Add(this.exponential);
            this.tabControl1.Controls.Add(this.gamma);
            this.tabControl1.Controls.Add(this.triangle);
            this.tabControl1.Controls.Add(this.simpson);
            this.tabControl1.Cursor = System.Windows.Forms.Cursors.Default;
            this.tabControl1.Location = new System.Drawing.Point(23, 15);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(310, 141);
            this.tabControl1.TabIndex = 21;
            // 
            // uniform
            // 
            this.uniform.BackColor = System.Drawing.Color.WhiteSmoke;
            this.uniform.Controls.Add(this.button6);
            this.uniform.Controls.Add(this.uniformN);
            this.uniform.Controls.Add(this.unN);
            this.uniform.Controls.Add(this.uniformB);
            this.uniform.Controls.Add(this.unB);
            this.uniform.Controls.Add(this.label5);
            this.uniform.Controls.Add(this.unA);
            this.uniform.Location = new System.Drawing.Point(4, 22);
            this.uniform.Name = "uniform";
            this.uniform.Padding = new System.Windows.Forms.Padding(3);
            this.uniform.Size = new System.Drawing.Size(302, 115);
            this.uniform.TabIndex = 0;
            this.uniform.Text = "Uniform";
            // 
            // gauss
            // 
            this.gauss.BackColor = System.Drawing.Color.WhiteSmoke;
            this.gauss.Controls.Add(this.button5);
            this.gauss.Controls.Add(this.label9);
            this.gauss.Controls.Add(this.gaC);
            this.gauss.Controls.Add(this.label8);
            this.gauss.Controls.Add(this.gaN);
            this.gauss.Controls.Add(this.label7);
            this.gauss.Controls.Add(this.gaA);
            this.gauss.Controls.Add(this.label6);
            this.gauss.Controls.Add(this.gaM);
            this.gauss.Location = new System.Drawing.Point(4, 22);
            this.gauss.Name = "gauss";
            this.gauss.Padding = new System.Windows.Forms.Padding(3);
            this.gauss.Size = new System.Drawing.Size(302, 115);
            this.gauss.TabIndex = 1;
            this.gauss.Text = "Gauss";
            // 
            // unA
            // 
            this.unA.Location = new System.Drawing.Point(29, 9);
            this.unA.Name = "unA";
            this.unA.Size = new System.Drawing.Size(100, 20);
            this.unA.TabIndex = 8;
            this.unA.Text = "5";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(6, 12);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(17, 13);
            this.label5.TabIndex = 8;
            this.label5.Text = "A:";
            this.label5.Click += new System.EventHandler(this.label5_Click);
            // 
            // uniformB
            // 
            this.uniformB.AutoSize = true;
            this.uniformB.Location = new System.Drawing.Point(6, 38);
            this.uniformB.Name = "uniformB";
            this.uniformB.Size = new System.Drawing.Size(17, 13);
            this.uniformB.TabIndex = 9;
            this.uniformB.Text = "B:";
            // 
            // unB
            // 
            this.unB.Location = new System.Drawing.Point(29, 35);
            this.unB.Name = "unB";
            this.unB.Size = new System.Drawing.Size(100, 20);
            this.unB.TabIndex = 10;
            this.unB.Text = "10";
            // 
            // uniformN
            // 
            this.uniformN.AutoSize = true;
            this.uniformN.Location = new System.Drawing.Point(6, 64);
            this.uniformN.Name = "uniformN";
            this.uniformN.Size = new System.Drawing.Size(18, 13);
            this.uniformN.TabIndex = 11;
            this.uniformN.Text = "N:";
            // 
            // unN
            // 
            this.unN.Location = new System.Drawing.Point(29, 61);
            this.unN.Name = "unN";
            this.unN.Size = new System.Drawing.Size(100, 20);
            this.unN.TabIndex = 12;
            this.unN.Text = "10000";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(6, 12);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(19, 13);
            this.label6.TabIndex = 9;
            this.label6.Text = "M:";
            // 
            // gaM
            // 
            this.gaM.Location = new System.Drawing.Point(50, 9);
            this.gaM.Name = "gaM";
            this.gaM.Size = new System.Drawing.Size(100, 20);
            this.gaM.TabIndex = 10;
            this.gaM.Text = "5";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(6, 38);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(17, 13);
            this.label7.TabIndex = 11;
            this.label7.Text = "A:";
            // 
            // gaA
            // 
            this.gaA.Location = new System.Drawing.Point(50, 35);
            this.gaA.Name = "gaA";
            this.gaA.Size = new System.Drawing.Size(100, 20);
            this.gaA.TabIndex = 12;
            this.gaA.Text = "10";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(6, 64);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(18, 13);
            this.label8.TabIndex = 13;
            this.label8.Text = "N:";
            // 
            // gaN
            // 
            this.gaN.Location = new System.Drawing.Point(50, 61);
            this.gaN.Name = "gaN";
            this.gaN.Size = new System.Drawing.Size(100, 20);
            this.gaN.TabIndex = 14;
            this.gaN.Text = "6";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(6, 90);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(38, 13);
            this.label9.TabIndex = 15;
            this.label9.Text = "Count:";
            // 
            // gaC
            // 
            this.gaC.Location = new System.Drawing.Point(50, 87);
            this.gaC.Name = "gaC";
            this.gaC.Size = new System.Drawing.Size(100, 20);
            this.gaC.TabIndex = 16;
            this.gaC.Text = "10000";
            // 
            // exponential
            // 
            this.exponential.BackColor = System.Drawing.Color.WhiteSmoke;
            this.exponential.Controls.Add(this.button4);
            this.exponential.Controls.Add(this.label11);
            this.exponential.Controls.Add(this.expCount);
            this.exponential.Controls.Add(this.label10);
            this.exponential.Controls.Add(this.expA);
            this.exponential.Location = new System.Drawing.Point(4, 22);
            this.exponential.Name = "exponential";
            this.exponential.Size = new System.Drawing.Size(302, 115);
            this.exponential.TabIndex = 2;
            this.exponential.Text = "Exponential";
            // 
            // gamma
            // 
            this.gamma.BackColor = System.Drawing.Color.WhiteSmoke;
            this.gamma.Controls.Add(this.button1);
            this.gamma.Controls.Add(this.label14);
            this.gamma.Controls.Add(this.gamCount);
            this.gamma.Controls.Add(this.label13);
            this.gamma.Controls.Add(this.gamN);
            this.gamma.Controls.Add(this.label12);
            this.gamma.Controls.Add(this.gamA);
            this.gamma.Location = new System.Drawing.Point(4, 22);
            this.gamma.Name = "gamma";
            this.gamma.Size = new System.Drawing.Size(302, 115);
            this.gamma.TabIndex = 3;
            this.gamma.Text = "Gamma";
            // 
            // triangle
            // 
            this.triangle.BackColor = System.Drawing.Color.WhiteSmoke;
            this.triangle.Controls.Add(this.button3);
            this.triangle.Controls.Add(this.label17);
            this.triangle.Controls.Add(this.trCount);
            this.triangle.Controls.Add(this.label16);
            this.triangle.Controls.Add(this.trB);
            this.triangle.Controls.Add(this.label15);
            this.triangle.Controls.Add(this.trA);
            this.triangle.Location = new System.Drawing.Point(4, 22);
            this.triangle.Name = "triangle";
            this.triangle.Size = new System.Drawing.Size(302, 115);
            this.triangle.TabIndex = 4;
            this.triangle.Text = "Triangle";
            // 
            // simpson
            // 
            this.simpson.BackColor = System.Drawing.Color.WhiteSmoke;
            this.simpson.Controls.Add(this.button2);
            this.simpson.Controls.Add(this.label20);
            this.simpson.Controls.Add(this.siCount);
            this.simpson.Controls.Add(this.label19);
            this.simpson.Controls.Add(this.siB);
            this.simpson.Controls.Add(this.label18);
            this.simpson.Controls.Add(this.siA);
            this.simpson.Location = new System.Drawing.Point(4, 22);
            this.simpson.Name = "simpson";
            this.simpson.Size = new System.Drawing.Size(302, 115);
            this.simpson.TabIndex = 5;
            this.simpson.Text = "Simpson";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(4, 10);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(37, 13);
            this.label10.TabIndex = 11;
            this.label10.Text = "Alpha:";
            // 
            // expA
            // 
            this.expA.Location = new System.Drawing.Point(48, 7);
            this.expA.Name = "expA";
            this.expA.Size = new System.Drawing.Size(100, 20);
            this.expA.TabIndex = 12;
            this.expA.Text = "0.5";
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(4, 36);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(19, 13);
            this.label11.TabIndex = 13;
            this.label11.Text = "M:";
            // 
            // expCount
            // 
            this.expCount.Location = new System.Drawing.Point(48, 33);
            this.expCount.Name = "expCount";
            this.expCount.Size = new System.Drawing.Size(100, 20);
            this.expCount.TabIndex = 14;
            this.expCount.Text = "10000";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(3, 9);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(37, 13);
            this.label12.TabIndex = 11;
            this.label12.Text = "Alpha:";
            // 
            // gamA
            // 
            this.gamA.Location = new System.Drawing.Point(47, 6);
            this.gamA.Name = "gamA";
            this.gamA.Size = new System.Drawing.Size(100, 20);
            this.gamA.TabIndex = 12;
            this.gamA.Text = "2.5";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(3, 35);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(23, 13);
            this.label13.TabIndex = 13;
            this.label13.Text = "Ny:";
            // 
            // gamN
            // 
            this.gamN.Location = new System.Drawing.Point(47, 32);
            this.gamN.Name = "gamN";
            this.gamN.Size = new System.Drawing.Size(100, 20);
            this.gamN.TabIndex = 14;
            this.gamN.Text = "18";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(3, 61);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(38, 13);
            this.label14.TabIndex = 15;
            this.label14.Text = "Count:";
            // 
            // gamCount
            // 
            this.gamCount.Location = new System.Drawing.Point(47, 58);
            this.gamCount.Name = "gamCount";
            this.gamCount.Size = new System.Drawing.Size(100, 20);
            this.gamCount.TabIndex = 16;
            this.gamCount.Text = "10000";
            // 
            // label15
            // 
            this.label15.AutoSize = true;
            this.label15.Location = new System.Drawing.Point(4, 9);
            this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(17, 13);
            this.label15.TabIndex = 11;
            this.label15.Text = "A:";
            // 
            // trA
            // 
            this.trA.Location = new System.Drawing.Point(48, 6);
            this.trA.Name = "trA";
            this.trA.Size = new System.Drawing.Size(100, 20);
            this.trA.TabIndex = 12;
            this.trA.Text = "2.5";
            // 
            // label16
            // 
            this.label16.AutoSize = true;
            this.label16.Location = new System.Drawing.Point(4, 35);
            this.label16.Name = "label16";
            this.label16.Size = new System.Drawing.Size(17, 13);
            this.label16.TabIndex = 13;
            this.label16.Text = "B:";
            // 
            // trB
            // 
            this.trB.Location = new System.Drawing.Point(48, 32);
            this.trB.Name = "trB";
            this.trB.Size = new System.Drawing.Size(100, 20);
            this.trB.TabIndex = 14;
            this.trB.Text = "18";
            // 
            // label17
            // 
            this.label17.AutoSize = true;
            this.label17.Location = new System.Drawing.Point(4, 61);
            this.label17.Name = "label17";
            this.label17.Size = new System.Drawing.Size(38, 13);
            this.label17.TabIndex = 15;
            this.label17.Text = "Count:";
            // 
            // trCount
            // 
            this.trCount.Location = new System.Drawing.Point(48, 58);
            this.trCount.Name = "trCount";
            this.trCount.Size = new System.Drawing.Size(100, 20);
            this.trCount.TabIndex = 16;
            this.trCount.Text = "10000";
            // 
            // label18
            // 
            this.label18.AutoSize = true;
            this.label18.Location = new System.Drawing.Point(1, 15);
            this.label18.Name = "label18";
            this.label18.Size = new System.Drawing.Size(17, 13);
            this.label18.TabIndex = 11;
            this.label18.Text = "A:";
            // 
            // siA
            // 
            this.siA.Location = new System.Drawing.Point(45, 12);
            this.siA.Name = "siA";
            this.siA.Size = new System.Drawing.Size(100, 20);
            this.siA.TabIndex = 12;
            this.siA.Text = "18";
            // 
            // label19
            // 
            this.label19.AutoSize = true;
            this.label19.Location = new System.Drawing.Point(1, 41);
            this.label19.Name = "label19";
            this.label19.Size = new System.Drawing.Size(17, 13);
            this.label19.TabIndex = 13;
            this.label19.Text = "B:";
            // 
            // siB
            // 
            this.siB.Location = new System.Drawing.Point(45, 38);
            this.siB.Name = "siB";
            this.siB.Size = new System.Drawing.Size(100, 20);
            this.siB.TabIndex = 14;
            this.siB.Text = "30";
            // 
            // label20
            // 
            this.label20.AutoSize = true;
            this.label20.Location = new System.Drawing.Point(1, 67);
            this.label20.Name = "label20";
            this.label20.Size = new System.Drawing.Size(38, 13);
            this.label20.TabIndex = 15;
            this.label20.Text = "Count:";
            // 
            // siCount
            // 
            this.siCount.Location = new System.Drawing.Point(45, 64);
            this.siCount.Name = "siCount";
            this.siCount.Size = new System.Drawing.Size(100, 20);
            this.siCount.TabIndex = 16;
            this.siCount.Text = "10000";
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(205, 3);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(94, 27);
            this.button1.TabIndex = 22;
            this.button1.Text = "Run";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(205, 5);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(94, 27);
            this.button2.TabIndex = 23;
            this.button2.Text = "Run";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(205, 6);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(94, 27);
            this.button3.TabIndex = 23;
            this.button3.Text = "Run";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // button4
            // 
            this.button4.Location = new System.Drawing.Point(205, 3);
            this.button4.Name = "button4";
            this.button4.Size = new System.Drawing.Size(94, 27);
            this.button4.TabIndex = 23;
            this.button4.Text = "Run";
            this.button4.UseVisualStyleBackColor = true;
            this.button4.Click += new System.EventHandler(this.button4_Click);
            // 
            // button5
            // 
            this.button5.Location = new System.Drawing.Point(205, 5);
            this.button5.Name = "button5";
            this.button5.Size = new System.Drawing.Size(94, 27);
            this.button5.TabIndex = 23;
            this.button5.Text = "Run";
            this.button5.UseVisualStyleBackColor = true;
            this.button5.Click += new System.EventHandler(this.button5_Click);
            // 
            // button6
            // 
            this.button6.Location = new System.Drawing.Point(202, 5);
            this.button6.Name = "button6";
            this.button6.Size = new System.Drawing.Size(94, 27);
            this.button6.TabIndex = 23;
            this.button6.Text = "Run";
            this.button6.UseVisualStyleBackColor = true;
            this.button6.Click += new System.EventHandler(this.button6_Click);
            // 
            // labelMx
            // 
            this.labelMx.AutoSize = true;
            this.labelMx.Location = new System.Drawing.Point(389, 56);
            this.labelMx.Name = "labelMx";
            this.labelMx.Size = new System.Drawing.Size(33, 13);
            this.labelMx.TabIndex = 6;
            this.labelMx.Text = "Mx = ";
            // 
            // labelDx
            // 
            this.labelDx.AutoSize = true;
            this.labelDx.Location = new System.Drawing.Point(389, 84);
            this.labelDx.Name = "labelDx";
            this.labelDx.Size = new System.Drawing.Size(32, 13);
            this.labelDx.TabIndex = 7;
            this.labelDx.Text = "Dx = ";
            // 
            // label_sko
            // 
            this.label_sko.AutoSize = true;
            this.label_sko.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label_sko.Location = new System.Drawing.Point(390, 105);
            this.label_sko.Name = "label_sko";
            this.label_sko.Size = new System.Drawing.Size(32, 17);
            this.label_sko.TabIndex = 8;
            this.label_sko.Text = "σ = ";
            // 
            // textBox_Mx
            // 
            this.textBox_Mx.Location = new System.Drawing.Point(420, 53);
            this.textBox_Mx.Name = "textBox_Mx";
            this.textBox_Mx.ReadOnly = true;
            this.textBox_Mx.Size = new System.Drawing.Size(185, 20);
            this.textBox_Mx.TabIndex = 9;
            // 
            // textBox_Dx
            // 
            this.textBox_Dx.Location = new System.Drawing.Point(420, 79);
            this.textBox_Dx.Name = "textBox_Dx";
            this.textBox_Dx.ReadOnly = true;
            this.textBox_Dx.Size = new System.Drawing.Size(185, 20);
            this.textBox_Dx.TabIndex = 10;
            // 
            // textBox_sko
            // 
            this.textBox_sko.Location = new System.Drawing.Point(420, 105);
            this.textBox_sko.Name = "textBox_sko";
            this.textBox_sko.ReadOnly = true;
            this.textBox_sko.Size = new System.Drawing.Size(185, 20);
            this.textBox_sko.TabIndex = 11;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(681, 468);
            this.Controls.Add(this.textBox_sko);
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.textBox_Dx);
            this.Controls.Add(this.textBox_Mx);
            this.Controls.Add(this.label_sko);
            this.Controls.Add(this.labelDx);
            this.Controls.Add(this.zedGraphControl1);
            this.Controls.Add(this.labelMx);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.Text = "Lab #2";
            this.tabControl1.ResumeLayout(false);
            this.uniform.ResumeLayout(false);
            this.uniform.PerformLayout();
            this.gauss.ResumeLayout(false);
            this.gauss.PerformLayout();
            this.exponential.ResumeLayout(false);
            this.exponential.PerformLayout();
            this.gamma.ResumeLayout(false);
            this.gamma.PerformLayout();
            this.triangle.ResumeLayout(false);
            this.triangle.PerformLayout();
            this.simpson.ResumeLayout(false);
            this.simpson.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private ZedGraph.ZedGraphControl zedGraphControl1;
        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage uniform;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.TextBox unA;
        private System.Windows.Forms.TabPage gauss;
        private System.Windows.Forms.Label uniformN;
        private System.Windows.Forms.TextBox unN;
        private System.Windows.Forms.Label uniformB;
        private System.Windows.Forms.TextBox unB;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.TextBox gaC;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.TextBox gaN;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.TextBox gaA;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox gaM;
        private System.Windows.Forms.Button button6;
        private System.Windows.Forms.Button button5;
        private System.Windows.Forms.TabPage exponential;
        private System.Windows.Forms.Button button4;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.TextBox expCount;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.TextBox expA;
        private System.Windows.Forms.TabPage gamma;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.TextBox gamCount;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.TextBox gamN;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.TextBox gamA;
        private System.Windows.Forms.TabPage triangle;
        private System.Windows.Forms.Button button3;
        private System.Windows.Forms.Label label17;
        private System.Windows.Forms.TextBox trCount;
        private System.Windows.Forms.Label label16;
        private System.Windows.Forms.TextBox trB;
        private System.Windows.Forms.Label label15;
        private System.Windows.Forms.TextBox trA;
        private System.Windows.Forms.TabPage simpson;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Label label20;
        private System.Windows.Forms.TextBox siCount;
        private System.Windows.Forms.Label label19;
        private System.Windows.Forms.TextBox siB;
        private System.Windows.Forms.Label label18;
        private System.Windows.Forms.TextBox siA;
        private System.Windows.Forms.Label labelMx;
        private System.Windows.Forms.Label labelDx;
        private System.Windows.Forms.Label label_sko;
        private System.Windows.Forms.TextBox textBox_Mx;
        private System.Windows.Forms.TextBox textBox_Dx;
        private System.Windows.Forms.TextBox textBox_sko;
    }
}

