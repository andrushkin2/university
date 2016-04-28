namespace lab3Hook
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
            this.startStopButton = new System.Windows.Forms.Button();
            this.hookGroup = new System.Windows.Forms.GroupBox();
            this.createHookGroup = new System.Windows.Forms.GroupBox();
            this.createCreateButton = new System.Windows.Forms.Button();
            this.createCancelButton = new System.Windows.Forms.Button();
            this.createKeyLabel = new System.Windows.Forms.TextBox();
            this.label9 = new System.Windows.Forms.Label();
            this.createCheckFade = new System.Windows.Forms.CheckBox();
            this.createStopProcText = new System.Windows.Forms.TextBox();
            this.createRunProcText = new System.Windows.Forms.TextBox();
            this.createEmulateText = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.hookConf = new System.Windows.Forms.GroupBox();
            this.fadeCheck = new System.Windows.Forms.CheckBox();
            this.stopProcText = new System.Windows.Forms.TextBox();
            this.runProcText = new System.Windows.Forms.TextBox();
            this.emulateText = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.hooksList = new System.Windows.Forms.ListBox();
            this.addHookButton = new System.Windows.Forms.Button();
            this.configButton = new System.Windows.Forms.Button();
            this.hookGroup.SuspendLayout();
            this.createHookGroup.SuspendLayout();
            this.hookConf.SuspendLayout();
            this.SuspendLayout();
            // 
            // startStopButton
            // 
            this.startStopButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.startStopButton.Location = new System.Drawing.Point(12, 12);
            this.startStopButton.Name = "startStopButton";
            this.startStopButton.Size = new System.Drawing.Size(121, 42);
            this.startStopButton.TabIndex = 0;
            this.startStopButton.Text = "Start";
            this.startStopButton.UseVisualStyleBackColor = true;
            this.startStopButton.Click += new System.EventHandler(this.startStopButton_Click);
            // 
            // hookGroup
            // 
            this.hookGroup.Controls.Add(this.createHookGroup);
            this.hookGroup.Controls.Add(this.hookConf);
            this.hookGroup.Controls.Add(this.hooksList);
            this.hookGroup.Location = new System.Drawing.Point(12, 82);
            this.hookGroup.Name = "hookGroup";
            this.hookGroup.Size = new System.Drawing.Size(661, 282);
            this.hookGroup.TabIndex = 1;
            this.hookGroup.TabStop = false;
            this.hookGroup.Text = "Hooks";
            // 
            // createHookGroup
            // 
            this.createHookGroup.Controls.Add(this.createCreateButton);
            this.createHookGroup.Controls.Add(this.createCancelButton);
            this.createHookGroup.Controls.Add(this.createKeyLabel);
            this.createHookGroup.Controls.Add(this.label9);
            this.createHookGroup.Controls.Add(this.createCheckFade);
            this.createHookGroup.Controls.Add(this.createStopProcText);
            this.createHookGroup.Controls.Add(this.createRunProcText);
            this.createHookGroup.Controls.Add(this.createEmulateText);
            this.createHookGroup.Controls.Add(this.label5);
            this.createHookGroup.Controls.Add(this.label6);
            this.createHookGroup.Controls.Add(this.label7);
            this.createHookGroup.Controls.Add(this.label8);
            this.createHookGroup.Location = new System.Drawing.Point(259, 19);
            this.createHookGroup.Name = "createHookGroup";
            this.createHookGroup.Size = new System.Drawing.Size(390, 251);
            this.createHookGroup.TabIndex = 8;
            this.createHookGroup.TabStop = false;
            this.createHookGroup.Text = "Create hook";
            // 
            // createCreateButton
            // 
            this.createCreateButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.createCreateButton.Location = new System.Drawing.Point(212, 186);
            this.createCreateButton.Name = "createCreateButton";
            this.createCreateButton.Size = new System.Drawing.Size(121, 42);
            this.createCreateButton.TabIndex = 10;
            this.createCreateButton.Text = "Create";
            this.createCreateButton.UseVisualStyleBackColor = true;
            this.createCreateButton.Click += new System.EventHandler(this.createCreateButton_Click);
            // 
            // createCancelButton
            // 
            this.createCancelButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.createCancelButton.Location = new System.Drawing.Point(58, 186);
            this.createCancelButton.Name = "createCancelButton";
            this.createCancelButton.Size = new System.Drawing.Size(121, 42);
            this.createCancelButton.TabIndex = 4;
            this.createCancelButton.Text = "Cancel";
            this.createCancelButton.UseVisualStyleBackColor = true;
            this.createCancelButton.Click += new System.EventHandler(this.createCancelButton_Click);
            // 
            // createKeyLabel
            // 
            this.createKeyLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.createKeyLabel.Location = new System.Drawing.Point(137, 32);
            this.createKeyLabel.MaxLength = 1;
            this.createKeyLabel.Name = "createKeyLabel";
            this.createKeyLabel.Size = new System.Drawing.Size(162, 22);
            this.createKeyLabel.TabIndex = 9;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label9.Location = new System.Drawing.Point(6, 34);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(34, 16);
            this.label9.TabIndex = 8;
            this.label9.Text = "Key:";
            this.label9.Click += new System.EventHandler(this.label9_Click);
            // 
            // createCheckFade
            // 
            this.createCheckFade.AutoSize = true;
            this.createCheckFade.Location = new System.Drawing.Point(137, 64);
            this.createCheckFade.Name = "createCheckFade";
            this.createCheckFade.Size = new System.Drawing.Size(15, 14);
            this.createCheckFade.TabIndex = 7;
            this.createCheckFade.UseVisualStyleBackColor = true;
            // 
            // createStopProcText
            // 
            this.createStopProcText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.createStopProcText.Location = new System.Drawing.Point(137, 147);
            this.createStopProcText.Name = "createStopProcText";
            this.createStopProcText.Size = new System.Drawing.Size(162, 22);
            this.createStopProcText.TabIndex = 6;
            // 
            // createRunProcText
            // 
            this.createRunProcText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.createRunProcText.Location = new System.Drawing.Point(137, 117);
            this.createRunProcText.Name = "createRunProcText";
            this.createRunProcText.Size = new System.Drawing.Size(162, 22);
            this.createRunProcText.TabIndex = 5;
            // 
            // createEmulateText
            // 
            this.createEmulateText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.createEmulateText.Location = new System.Drawing.Point(137, 89);
            this.createEmulateText.Name = "createEmulateText";
            this.createEmulateText.Size = new System.Drawing.Size(162, 22);
            this.createEmulateText.TabIndex = 4;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label5.Location = new System.Drawing.Point(6, 150);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(91, 16);
            this.label5.TabIndex = 3;
            this.label5.Text = "Stop process:";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label6.Location = new System.Drawing.Point(6, 120);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(87, 16);
            this.label6.TabIndex = 2;
            this.label6.Text = "Run procces:";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label7.Location = new System.Drawing.Point(6, 92);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(68, 16);
            this.label7.TabIndex = 1;
            this.label7.Text = "Emaulate:";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label8.Location = new System.Drawing.Point(6, 62);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(43, 16);
            this.label8.TabIndex = 0;
            this.label8.Text = "Fade:";
            // 
            // hookConf
            // 
            this.hookConf.Controls.Add(this.fadeCheck);
            this.hookConf.Controls.Add(this.stopProcText);
            this.hookConf.Controls.Add(this.runProcText);
            this.hookConf.Controls.Add(this.emulateText);
            this.hookConf.Controls.Add(this.label4);
            this.hookConf.Controls.Add(this.label3);
            this.hookConf.Controls.Add(this.label2);
            this.hookConf.Controls.Add(this.label1);
            this.hookConf.Location = new System.Drawing.Point(265, 19);
            this.hookConf.Name = "hookConf";
            this.hookConf.Size = new System.Drawing.Size(390, 251);
            this.hookConf.TabIndex = 1;
            this.hookConf.TabStop = false;
            this.hookConf.Text = "Hook config";
            this.hookConf.Enter += new System.EventHandler(this.groupBox1_Enter);
            // 
            // fadeCheck
            // 
            this.fadeCheck.AutoSize = true;
            this.fadeCheck.Location = new System.Drawing.Point(137, 36);
            this.fadeCheck.Name = "fadeCheck";
            this.fadeCheck.Size = new System.Drawing.Size(15, 14);
            this.fadeCheck.TabIndex = 7;
            this.fadeCheck.UseVisualStyleBackColor = true;
            // 
            // stopProcText
            // 
            this.stopProcText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.stopProcText.Location = new System.Drawing.Point(137, 120);
            this.stopProcText.Name = "stopProcText";
            this.stopProcText.Size = new System.Drawing.Size(162, 22);
            this.stopProcText.TabIndex = 6;
            // 
            // runProcText
            // 
            this.runProcText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.runProcText.Location = new System.Drawing.Point(137, 92);
            this.runProcText.Name = "runProcText";
            this.runProcText.Size = new System.Drawing.Size(162, 22);
            this.runProcText.TabIndex = 5;
            // 
            // emulateText
            // 
            this.emulateText.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.emulateText.Location = new System.Drawing.Point(137, 62);
            this.emulateText.Name = "emulateText";
            this.emulateText.Size = new System.Drawing.Size(162, 22);
            this.emulateText.TabIndex = 4;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label4.Location = new System.Drawing.Point(6, 124);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(91, 16);
            this.label4.TabIndex = 3;
            this.label4.Text = "Stop process:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label3.Location = new System.Drawing.Point(6, 95);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(87, 16);
            this.label3.TabIndex = 2;
            this.label3.Text = "Run procces:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label2.Location = new System.Drawing.Point(6, 65);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(68, 16);
            this.label2.TabIndex = 1;
            this.label2.Text = "Emaulate:";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.label1.Location = new System.Drawing.Point(6, 35);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(43, 16);
            this.label1.TabIndex = 0;
            this.label1.Text = "Fade:";
            // 
            // hooksList
            // 
            this.hooksList.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.hooksList.FormattingEnabled = true;
            this.hooksList.ItemHeight = 16;
            this.hooksList.Location = new System.Drawing.Point(6, 19);
            this.hooksList.Name = "hooksList";
            this.hooksList.Size = new System.Drawing.Size(223, 244);
            this.hooksList.TabIndex = 0;
            // 
            // addHookButton
            // 
            this.addHookButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.addHookButton.Location = new System.Drawing.Point(299, 12);
            this.addHookButton.Name = "addHookButton";
            this.addHookButton.Size = new System.Drawing.Size(121, 42);
            this.addHookButton.TabIndex = 3;
            this.addHookButton.Text = "Add hook";
            this.addHookButton.UseVisualStyleBackColor = true;
            this.addHookButton.Click += new System.EventHandler(this.addHookButton_Click);
            // 
            // configButton
            // 
            this.configButton.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
            this.configButton.Location = new System.Drawing.Point(154, 12);
            this.configButton.Name = "configButton";
            this.configButton.Size = new System.Drawing.Size(121, 42);
            this.configButton.TabIndex = 2;
            this.configButton.Text = "Hook manager";
            this.configButton.UseVisualStyleBackColor = true;
            this.configButton.Click += new System.EventHandler(this.configButton_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(685, 373);
            this.Controls.Add(this.addHookButton);
            this.Controls.Add(this.configButton);
            this.Controls.Add(this.hookGroup);
            this.Controls.Add(this.startStopButton);
            this.Name = "Form1";
            this.Text = "Form1";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.Form1_FormClosed);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.hookGroup.ResumeLayout(false);
            this.createHookGroup.ResumeLayout(false);
            this.createHookGroup.PerformLayout();
            this.hookConf.ResumeLayout(false);
            this.hookConf.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button startStopButton;
        private System.Windows.Forms.GroupBox hookGroup;
        private System.Windows.Forms.GroupBox hookConf;
        private System.Windows.Forms.ListBox hooksList;
        private System.Windows.Forms.Button addHookButton;
        private System.Windows.Forms.CheckBox fadeCheck;
        private System.Windows.Forms.TextBox stopProcText;
        private System.Windows.Forms.TextBox runProcText;
        private System.Windows.Forms.TextBox emulateText;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button configButton;
        private System.Windows.Forms.GroupBox createHookGroup;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.CheckBox createCheckFade;
        private System.Windows.Forms.TextBox createStopProcText;
        private System.Windows.Forms.TextBox createRunProcText;
        private System.Windows.Forms.TextBox createEmulateText;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.TextBox createKeyLabel;
        private System.Windows.Forms.Button createCreateButton;
        private System.Windows.Forms.Button createCancelButton;
    }
}

