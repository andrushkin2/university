namespace lab3
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
            this.SuspendLayout();
            // 
            // Form1
            // 
            this.ClientSize = new System.Drawing.Size(284, 261);
            this.Name = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
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

