using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace lab3Hook
{
    public partial class Form1 : Form
    {
        private string confButtonOpenText = "Hook manager";
        private string confButtonCloseText = "Close manager";
        private string startStopButtonTextStart = "Start";
        private string startStopButtonTextStop = "Stop";
        private const int startStopState = 0;
        private const int openHookManager = 1;
        private const int createNewHook = 2;
        private const int editRemoveHook = 3;
        private int activeState;
        TypeConverter converter = Manager.converter;
        public hookManager hooksManager = Manager.hooksManager;
        public Form1()
        {
            InitializeComponent();
            hooksManager.clearHooks();
            startStopButton.Text = startStopButtonTextStart;
            setStateOfApp(startStopState);
        }
        public hookManager getHookManager()
        {
            return hooksManager;
        }
        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }
        private void startHook()
        {
            Hook.SetHook();
            Manager.writeLineToFile("Start session - " + DateTime.Now.ToString());
        }
        private void stopHook(bool isIgnoreLog = false)
        {
            Hook.UnHook();
            if (!isIgnoreLog)
            {
                Manager.writeLineToFile("End session - " + DateTime.Now.ToString());
            }
        }
        private void setStateOfApp(int state)
        {
            switch (state)
            {
                case startStopState:
                    {
                        startStopButton.Enabled = true;
                        configButton.Text = confButtonOpenText;
                        addHookButton.Hide();
                        hookGroup.Hide();
                        createHookGroup.Hide();
                        hookConf.Hide();
                        break;
                    }
                case openHookManager:
                    {
                        startStopButton.Enabled = false;
                        hooksList.ClearSelected();
                        hooksList.Enabled = true;
                        hookConf.Hide();
                        createHookGroup.Hide();
                        hookGroup.Show();
                        addHookButton.Show();
                        addHookButton.Enabled = true;
                        configButton.Enabled = true;
                        configButton.Text = confButtonCloseText;
                        refreshHooksList();
                        break;
                    }
                case createNewHook:
                    {
                        startStopButton.Enabled = false;
                        hookGroup.Show();
                        createHookGroup.Show();
                        hookConf.Hide();
                        hooksList.ClearSelected();
                        hooksList.Enabled = false;
                        clearCreateHookGroup();
                        addHookButton.Enabled = false;
                        addHookButton.Show();
                        configButton.Enabled = false;
                        configButton.Text = confButtonCloseText;
                        break;
                    }
                default:
                    throw new Exception("Cannot switch to anknown state of page");
            }
            activeState = state;
        }

        private void refreshHooksList()
        {
            hooksList.Items.Clear();
            List<hookClass> hooks = hooksManager.getHooksList();
            foreach(hookClass hook in hooks)
            {
                hooksList.Items.Add(hook.key + " - " + hook.keyCode);
            }
        }

        private void clearCreateHookGroup()
        {
            createCancelButton.Show();
            createCreateButton.Show();
            createKeyLabel.Text = "";
            createCheckFade.Checked = false;
            createEmulateText.Text = "";
            createRunProcText.Text = "";
            createStopProcText.Text = "";
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            stopHook(true);
        }

        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
        }

        private void configButton_Click(object sender, EventArgs e)
        {
            setStateOfApp(activeState == openHookManager ? startStopState : openHookManager);
        }

        private void label9_Click(object sender, EventArgs e)
        {

        }

        private void addHookButton_Click(object sender, EventArgs e)
        {
            setStateOfApp(createNewHook);
        }

        private void createCancelButton_Click(object sender, EventArgs e)
        {
            clearCreateHookGroup();
            setStateOfApp(openHookManager);
        }

        private void startStopButton_Click(object sender, EventArgs e)
        {
            if (startStopButton.Text == startStopButtonTextStart){
                configButton.Enabled = false;
                startStopButton.Text = startStopButtonTextStop;
                this.ShowInTaskbar = false;
                startHook();
            } else {
                configButton.Enabled = true;
                this.ShowInTaskbar = true;
                startStopButton.Text = startStopButtonTextStart;
                stopHook();
            }
        }

        private void createCreateButton_Click(object sender, EventArgs e)
        {
            string label = createKeyLabel.Text.Trim().ToUpper();
            bool fade = createCheckFade.Checked;
            string emulate = createEmulateText.Text.Trim();
            string runProc = createRunProcText.Text.Trim();
            string stopProc = createStopProcText.Text.Trim();
            if (label.Length != 1)
            {
                MessageBox.Show("Label should have a one symbol");
                return;
            }
            Keys key = (Keys)converter.ConvertFromString(label);
            hookClass hook = new hookClass(label, key.GetHashCode(), fade, emulate, runProc, stopProc);
            if (hooksManager.isHookWithCodeExist(hook.keyCode))
            {
                MessageBox.Show("Hook with this key exists");
                return;
            }
            if (!hooksManager.addNewHook(hook))
            {
                MessageBox.Show("Add hook operation failed");
                return;
            }
            setStateOfApp(openHookManager);

        }

        private void hooksList_SelectedIndexChanged(object sender, EventArgs e)
        {
            int index = hooksList.SelectedIndex;
            if (index >= 0 && hooksList.Items.Count > index)
            {
                hookClass hook = hooksManager.getHookByIndex(index);
                if (hook.isClassEmpty())
                {
                    MessageBox.Show("Cannot find hook selected hook");
                    refreshHooksList();
                    return;
                }
                hookConf.Show();
                hookConfigLabel.Text = hook.key + " - " + hook.keyCode;
                fadeCheck.Checked = hook.fade;
                emulateText.Text = hook.emulate;
                runProcText.Text = hook.runPocess;
                stopProcText.Text = hook.stopProcess;
            }
        }

        private void saveHookConfigButton_Click(object sender, EventArgs e)
        {
            int index = hooksList.SelectedIndex;
            if (index >= 0 && hooksList.Items.Count > index)
            {
                hookClass hook = hooksManager.getHookByIndex(index);
                if (hook.isClassEmpty())
                {
                    MessageBox.Show("Cannot find hook selected hook");
                    refreshHooksList();
                    return;
                }

                hook.fade = fadeCheck.Checked;
                hook.emulate = emulateText.Text.Trim();
                hook.runPocess = runProcText.Text.Trim();
                hook.stopProcess = stopProcText.Text.Trim();
            }
            setStateOfApp(openHookManager);
        }

        private void removeHookConfigButton_Click(object sender, EventArgs e)
        {
            int index = hooksList.SelectedIndex;
            if (index >= 0 && hooksList.Items.Count > index)
            {
                hookClass hook = hooksManager.getHookByIndex(index);
                if (hook.isClassEmpty())
                {
                    MessageBox.Show("Cannot remove empty hook");
                    refreshHooksList();
                    return;
                }
                if (!hooksManager.removeHookWithCode(hook.keyCode))
                {
                    MessageBox.Show("Cannot remove selected hook");
                    refreshHooksList();
                    return;
                }
            }
            setStateOfApp(openHookManager);
        }
    }
    public static class Manager
    {
        public static hookManager hooksManager = new hookManager();
        public static TypeConverter converter = TypeDescriptor.GetConverter(typeof(Keys));
        public static void writeLineToFile(string line)
        {
            System.IO.StreamWriter file = new System.IO.StreamWriter(".\\logs.txt", true);
            file.WriteLine(line);
            file.Close();
        }
    }
    public partial class Hook
    {
        [DllImport("user32.dll")]
        static extern IntPtr SetWindowsHookEx(int idHook, LowLevelKeyboardProc callback, IntPtr hInstance, uint threadId);

        [DllImport("user32.dll")]
        static extern bool UnhookWindowsHookEx(IntPtr hInstance);

        [DllImport("user32.dll")]
        static extern IntPtr CallNextHookEx(IntPtr idHook, int nCode, int wParam, IntPtr lParam);

        [DllImport("kernel32.dll")]
        static extern IntPtr LoadLibrary(string lpFileName);

        private delegate IntPtr LowLevelKeyboardProc(int nCode, IntPtr wParam, IntPtr lParam);

        const int WH_KEYBOARD_LL = 13; // Номер глобального LowLevel-хука на клавиатуру 
        const int WM_KEYDOWN = 0x100; // Сообщения нажатия клавиши 

        private static LowLevelKeyboardProc _proc = hookProc;

        private static IntPtr hhook = IntPtr.Zero;

        public static void SetHook()
        {
            IntPtr hInstance = LoadLibrary("User32");
            hhook = SetWindowsHookEx(WH_KEYBOARD_LL, _proc, hInstance, 0);
        }

        public static void UnHook()
        {
            UnhookWindowsHookEx(hhook);
        }

        public static IntPtr hookProc(int code, IntPtr wParam, IntPtr lParam)
        {
            if (code >= 0 && wParam == (IntPtr)WM_KEYDOWN)
            {
                int keyCode = Marshal.ReadInt32(lParam),
                    returnKeyCode = -1;
                hookClass hook = Manager.hooksManager.getHookByCode(keyCode);
                if (hook.isClassEmpty())
                {
                    Manager.writeLineToFile((Keys)(keyCode) + " - " + keyCode);
                    return CallNextHookEx(hhook, code, (int)wParam, lParam);
                }
                Manager.writeLineToFile(hook.key + " - " + hook.keyCode);
                if (hook.fade)
                {
                    return (IntPtr)1;
                } else {
                    Keys emulateKey;
                    bool canSendKey = false;
                    if (hook.emulate != "")
                    {
                        try
                        {
                            emulateKey = (Keys)Manager.converter.ConvertFromString(hook.emulate.ToUpper());
                            canSendKey = true;
                        }
                        catch (Exception e)
                        {
                            MessageBox.Show("Cannot parse to key - " + hook.emulate + "\n" + e.ToString());
                            return CallNextHookEx(hhook, code, (int)wParam, lParam);
                        }
                        returnKeyCode = emulateKey.GetHashCode();
                    }
                    if (hook.runPocess != "")
                    {
                        try
                        {
                            Process.Start(hook.runPocess);
                        } catch(Exception e)
                        {
                            MessageBox.Show("Cannot start process - " + hook.runPocess + "\n" + e.ToString());
                        }
                    }
                    if (hook.stopProcess != "")
                    {
                        try
                        {
                            Process[] processes = Process.GetProcesses();
                            foreach (Process process in processes)
                            {
                                if (process.ProcessName.ToLower().Contains(hook.stopProcess))
                                {
                                    process.Kill();
                                }
                            }
                        }
                        catch (Exception e)
                        {
                            MessageBox.Show("Cannot stop process - " + hook.stopProcess + "\n" + e.ToString());
                        }
                    }
                    if (canSendKey)
                    {
                        SendKeys.Send(hook.emulate);
                        return (IntPtr)1;
                    }
                    else {
                        return CallNextHookEx(hhook, code, (int)wParam, lParam);
                    }
                }
                
            }
            else
                return CallNextHookEx(hhook, code, (int)wParam, lParam);
        }
    }
}
