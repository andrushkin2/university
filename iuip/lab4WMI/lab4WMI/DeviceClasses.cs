using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    public class DeviceClasses
    {
        public static Guid ClassesGuid;
        public const int MAX_SIZE_DEVICE_DESCRIPTION = 1000;
        public const int CR_SUCCESS = 0x00000000;
        public const int CR_NO_SUCH_VALUE = 0x00000025;
        public const int CR_INVALID_DATA = 0x0000001F;
        private const int DIGCF_PRESENT = 0x00000002;
        private const int DIOCR_INSTALLER = 0x00000001;
        private const int MAXIMUM_ALLOWED = 0x02000000;
        public const int DMI_MASK = 0x00000001;
        public const int DMI_BKCOLOR = 0x00000002;
        public const int DMI_USERECT = 0x00000004;

        /// <summary>
        /// Define a member of a device instance is a device information set
        /// </summary>
        [StructLayout(LayoutKind.Sequential)]
        class SP_DEVINFO_DATA
        {
            public int cbSize;
            public Guid ClassGuid;
            public int DevInst;
            public ulong Reserved;
        }
        /// <summary>
        /// Provide local machine GUID to enumerate each class of installed equipment
        /// </summary>
        /// <param name="ClassIndex"></param>
        /// <param name="ClassGuid"></param>
        /// <param name="Params"></param>
        /// <returns></returns>
        [DllImport("cfgmgr32.dll")]
        private static extern UInt32 CM_Enumerate_Classes(UInt32 ClassIndex, ref Guid ClassGuid, UInt32 Params);
        /// <summary>
        /// Retrieval with class GUID class name
        /// </summary>
        /// <param name="ClassGuid"></param>
        /// <param name="ClassName"></param>
        /// <param name="ClassNameSize"></param>
        /// <param name="RequiredSize"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        private static extern Boolean SetupDiClassNameFromGuidA(ref Guid ClassGuid, StringBuilder ClassName, UInt32 ClassNameSize, ref UInt32 RequiredSize);
        /// <summary>
        /// All the equipment has been installed to obtain the information of a specified class or all categories
        /// </summary>
        /// <param name="ClassGuid"></param>
        /// <param name="Enumerator"></param>
        /// <param name="hwndParent"></param>
        /// <param name="Flags"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        private static extern IntPtr SetupDiGetClassDevsA(ref Guid ClassGuid, UInt32 Enumerator, IntPtr hwndParent, UInt32 Flags);
        /// <summary>
        /// The destruction of a device information set, and the release of all associated memory
        /// </summary>
        /// <param name="DeviceInfoSet"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        private static extern Boolean SetupDiDestroyDeviceInfoList(IntPtr DeviceInfoSet);
        /// <summary>
        /// Open the device setup class of the registry, the registry key device interface class, sub item or a particular class. This function opens to specify the local computer or on a remote computer keys. 
        /// </summary>
        /// <param name="ClassGuid"></param>
        /// <param name="samDesired"></param>
        /// <param name="Flags"></param>
        /// <param name="MachineName"></param>
        /// <param name="Reserved"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        private static extern IntPtr SetupDiOpenClassRegKeyExA(ref Guid ClassGuid, UInt32 samDesired, int Flags, IntPtr MachineName, UInt32 Reserved);
        /// <summary>
        /// Get device information element of the collection device information. 
        /// </summary>
        /// <param name="DeviceInfoSet"></param>
        /// <param name="MemberIndex"></param>
        /// <param name="DeviceInfoData"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        private static extern Boolean SetupDiEnumDeviceInfo(IntPtr DeviceInfoSet, UInt32 MemberIndex, SP_DEVINFO_DATA DeviceInfoData);
        /// <summary>
        /// The specified default item or sub item (unnamed) value 
        /// </summary>
        /// <param name="KeyClass"></param>
        /// <param name="SubKey"></param>
        /// <param name="ClassDescription"></param>
        /// <param name="sizeB"></param>
        /// <returns></returns>
        [DllImport("advapi32.dll")]
        private static extern UInt32 RegQueryValueA(IntPtr KeyClass, UInt32 SubKey, StringBuilder ClassDescription, ref UInt32 sizeB);

        /// <summary>
        /// The device type icon information
        /// </summary>
        [StructLayout(LayoutKind.Sequential)]
        public class SP_CLASSIMAGELIST_DATA
        {
            public int cbSize;
            public string ImageList;
            public ulong Reserved;
        }
        public struct RECT
        {
            long left;
            long top;
            long right;
            long bottom;
        }

        /// <summary>
        /// Load images
        /// </summary>
        /// <param name="hInstance"></param>
        /// <param name="Reserved"></param>
        /// <returns></returns>
        [DllImport("user32.dll")]
        public static extern int LoadBitmapW(int hInstance, ulong Reserved);

        /// <summary>
        /// Get Icon
        /// </summary>
        /// <param name="ClassImageListData"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        public static extern Boolean SetupDiGetClassImageList(out SP_CLASSIMAGELIST_DATA ClassImageListData);
        /// <summary>
        /// Draw a small icon
        /// </summary>
        /// <param name="hdc"></param>
        /// <param name="rc"></param>
        /// <param name="MiniIconIndex"></param>
        /// <param name="Flags"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        public static extern int SetupDiDrawMiniIcon(Graphics hdc, RECT rc, int MiniIconIndex, int Flags);
        /// <summary>
        /// Retrieves the specified class provides a small icon index. 
        /// </summary>
        /// <param name="ClassGuid"></param>
        /// <param name="MiniIconIndex"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        public static extern bool SetupDiGetClassBitmapIndex(Guid ClassGuid, out int MiniIconIndex);
        /// <summary>
        /// Loading a small icon
        /// </summary>
        /// <param name="classGuid"></param>
        /// <param name="hIcon"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        [DllImport("setupapi.dll")]
        public static extern int SetupDiLoadClassIcon(ref Guid classGuid, out IntPtr hIcon, out int index);

        /// <summary>
        /// Enumeration types of equipment
        /// </summary>
        /// <param name="ClassIndex"></param>
        /// <param name="ClassName">The device type name</param>
        /// <param name="ClassDescription">Equipment type description</param>
        /// <param name="DevicePresent"></param>
        /// <returns></returns>
        public static int EnumerateClasses(UInt32 ClassIndex, StringBuilder ClassName, StringBuilder ClassDescription, ref bool DevicePresent)
        {
            Guid ClassGuid = Guid.Empty;
            IntPtr NewDeviceInfoSet;
            UInt32 result;
            SP_DEVINFO_DATA DeviceInfoData = new SP_DEVINFO_DATA();
            bool resNam = false;
            UInt32 RequiredSize = 0;
            result = CM_Enumerate_Classes(ClassIndex, ref ClassGuid, 0);
            DevicePresent = false;
            SP_CLASSIMAGELIST_DATA imagelist = new SP_CLASSIMAGELIST_DATA();
            if (result != CR_SUCCESS)
            {
                return (int)result;
            }
            resNam = SetupDiClassNameFromGuidA(ref ClassGuid, ClassName, RequiredSize, ref RequiredSize);
            if (RequiredSize > 0)
            {
                ClassName.Capacity = (int)RequiredSize;
                resNam = SetupDiClassNameFromGuidA(ref ClassGuid, ClassName, RequiredSize, ref RequiredSize);
            }
            NewDeviceInfoSet = SetupDiGetClassDevsA(ref ClassGuid, 0, IntPtr.Zero, DIGCF_PRESENT);
            if (NewDeviceInfoSet.ToInt32() == -1)
            {
                DevicePresent = false;
                return 0;
            }

            UInt32 numD = 0;
            DeviceInfoData.cbSize = 28;
            DeviceInfoData.DevInst = 0;
            DeviceInfoData.ClassGuid = System.Guid.Empty;
            DeviceInfoData.Reserved = 0;

            Boolean res1 = SetupDiEnumDeviceInfo(
            NewDeviceInfoSet,
            numD,
            DeviceInfoData);

            if (!res1)
            {
                DevicePresent = false;
                return 0;
            }
            SetupDiDestroyDeviceInfoList(NewDeviceInfoSet);
            IntPtr KeyClass = SetupDiOpenClassRegKeyExA(
                ref ClassGuid, MAXIMUM_ALLOWED, DIOCR_INSTALLER, IntPtr.Zero, 0);
            if (KeyClass.ToInt32() == -1)
            {
                DevicePresent = false;
                return 0;
            }
            UInt32 sizeB = MAX_SIZE_DEVICE_DESCRIPTION;
            ClassDescription.Capacity = MAX_SIZE_DEVICE_DESCRIPTION;
            UInt32 res = RegQueryValueA(KeyClass, 0, ClassDescription, ref sizeB);
            if (res != 0) ClassDescription = new StringBuilder(""); //No device description
            DevicePresent = true;
            ClassesGuid = DeviceInfoData.ClassGuid;
            return 0;
        }
    }
}
