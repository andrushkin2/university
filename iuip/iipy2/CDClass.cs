using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

const int OPEN_EXISTING = 3;
const uint GENERIC_READ = 0x80000000;
const uint GENERIC_WRITE = 0x40000000;
const uint IOCTL_STORAGE_EJECT_MEDIA = 0x2D4808;

namespace iipy2
{
    internal class OpenOrCloseCDDrive
    {
        [DllImport("winmm.dll", CharSet = CharSet.Auto, EntryPoint = "mciSendString")]
        public static extern int MciSendString(string command,
           StringBuilder buffer, int bufferSize, IntPtr hwndCallback);

        protected const int IntMciSuccess = 0;
        protected const int IntBufferSize = 127;

        protected List<DriveInfo> listCDDrives = new List<DriveInfo>();

        public List<DriveInfo> GetCDDrives
        {
            get
            {
                return listCDDrives;
            }
        }

        public OpenOrCloseCDDrive()
        {
            DriveInfo[] drives = DriveInfo.GetDrives();

            foreach (DriveInfo drive in drives)
            {
                if (drive.DriveType == DriveType.CDRom)
                {
                    listCDDrives.Add(drive);
                }
            }
        }

        public void Open(DriveInfo cdDrive)
        {
            if (cdDrive.DriveType != DriveType.CDRom)
            {
                throw new InvalidOperationException
                    ("Handed over parameter does not contain a valid CD/DVD drive!");
            }

            StringBuilder buffer = new StringBuilder();

            int errorCode = MciSendString
                (
                (
                String.Format
                ("set CDAudio!{0} door open", cdDrive.Name)
                ),
                buffer,
                IntBufferSize,
                IntPtr.Zero
                );
        }

        public void Close(DriveInfo cdDrive)
        {
            if (cdDrive.DriveType != DriveType.CDRom)
            {
                throw new InvalidOperationException
                    ("Handed over parameter does not contain a valid CD/DVD drive!");
            }

            StringBuilder buffer = new StringBuilder();

            int errorCode = MciSendString
                (
                (
                String.Format
                ("set CDAudio!{0} door closed", cdDrive.Name)
                ),
                buffer,
                IntBufferSize,
                IntPtr.Zero
                );
        }
    }

    [DllImport("kernel32")]
    private static extern int CloseHandle(IntPtr handle);

    [DllImport("kernel32")]
    private static extern int DeviceIoControl
        (IntPtr deviceHandle, uint ioControlCode,
          IntPtr inBuffer, int inBufferSize,
          IntPtr outBuffer, int outBufferSize,
          ref int bytesReturned, IntPtr overlapped);

    [DllImport("kernel32")]
    private static extern IntPtr CreateFile
        (string filename, uint desiredAccess,
          uint shareMode, IntPtr securityAttributes,
          int creationDisposition, int flagsAndAttributes,
          IntPtr templateFile);

    public static void EjectDrive(char driveLetter)
    {
        string path = "\\\\.\\" + driveLetter + ":";

        IntPtr handle = CreateFile(path, GENERIC_READ | GENERIC_WRITE, 0,
            IntPtr.Zero, OPEN_EXISTING, 0, IntPtr.Zero);

        if ((long)handle == -1)
        {
            MessageBox.Show("Unable to open drive " + driveLetter);
            return;
        }

        int dummy = 0;

        DeviceIoControl(handle, IOCTL_STORAGE_EJECT_MEDIA, IntPtr.Zero, 0,
            IntPtr.Zero, 0, ref dummy, IntPtr.Zero);

        CloseHandle(handle);

        MessageBox.Show("OK to remove drive.");
    }
}