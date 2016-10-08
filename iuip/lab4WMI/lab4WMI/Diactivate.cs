using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    class Diactivate
    {
        const uint DIF_PROPERTYCHANGE = 0x12;
        const uint DICS_ENABLE = 1;
        const uint DICS_DISABLE = 2;
        const uint DICS_FLAG_GLOBAL = 1;
        const uint ERROR_INVALID_DATA = 13;
        const uint ERROR_NO_MORE_ITEMS = 259;
        const uint ERROR_ELEMENT_NOT_FOUND = 1168;
        const uint DICS_FLAG_CONFIGSPECIFIC = 0x00000002;


        [StructLayout(LayoutKind.Sequential)]
        struct SP_CLASSINSTALL_HEADER
        {
            public UInt32 cbSize;
            public UInt32 InstallFunction;
        }

        [StructLayout(LayoutKind.Sequential)]
        struct SP_PROPCHANGE_PARAMS
        {
            public SP_CLASSINSTALL_HEADER ClassInstallHeader;
            public UInt32 StateChange;
            public UInt32 Scope;
            public UInt32 HwProfile;
        }

        [DllImport("setupapi.dll", SetLastError = true, CharSet = CharSet.Auto)]
        static extern bool SetupDiSetClassInstallParams(IntPtr DeviceInfoSet, ref SP_DEVINFO_DATA DeviceInfoData, IntPtr ClassInstallParams, int ClassInstallParamsSize);

        [DllImport("setupapi.dll", SetLastError = true)]
        static extern bool SetupDiCallClassInstaller(
             UInt32 InstallFunction,
             IntPtr DeviceInfoSet,
             ref SP_DEVINFO_DATA DeviceInfoData
        );

        [DllImport("setupapi.dll", SetLastError = true)]
        static extern bool SetupDiChangeState(
            IntPtr deviceInfoSet,
            [In] ref SP_DEVINFO_DATA deviceInfoData);


        private const int DIGCF_PRESENT = 0x00000002;
        private const int DIGCF_ALLCLASSES = 0x4;
        private const int DIGCF_DEFAULT = 0x00000001;
        private const int SPDRP_LOCATION_PATHS = 0x00000023;
        private const int SPDRP_CLASS = 0x00000007;
        private const int SPDRP_MFG = 0x0000000B;
        private const int SPDRP_ENUMERATOR_NAME = 0x00000016;
        private const int SPDRP_HARDWAREID = 0x00000001;
        private const int SPDRP_DEVTYPE = 0x00000019;
        private const int SPDRP_DEVICEDESC = 0x00000000;
        private const int DIREG_DEV = 0x00000001;
        private const int KEY_QUERY_VALUE = 0x0001;

        [StructLayout(LayoutKind.Sequential)]
        public struct SP_DEVINFO_DATA
        {
            public int cbSize;
            public Guid ClassGuid;
            public int DevInst;
            public ulong Reserved;
        };

        [DllImport("setupapi.dll")]
        private static extern Int32 SetupDiDestroyDeviceInfoList(IntPtr DeviceInfoSet);

        [DllImport("setupapi.dll", SetLastError = true)]
        static extern int CM_Get_Child(out UInt32 pdnDevInst, UInt32 dnDevInst, int ulFlags);

        [DllImport("setupapi.dll")]
        private static extern bool SetupDiEnumDeviceInfo(IntPtr DeviceInfoSet, Int32 MemberIndex, ref SP_DEVINFO_DATA DeviceInterfaceData);

        [DllImport("setupapi.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern bool SetupDiGetDeviceRegistryProperty(IntPtr deviceInfoSet, ref SP_DEVINFO_DATA deviceInfoData,
            uint property, out UInt32 propertyRegDataType, StringBuilder propertyBuffer, uint propertyBufferSize, out UInt32 requiredSize);

        [DllImport("setupapi.dll", SetLastError = true)]
        private static extern IntPtr SetupDiGetClassDevs(IntPtr gClass, string iEnumerator, IntPtr hParent, int nFlags);

        [DllImport("Setupapi", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr SetupDiOpenDevRegKey(IntPtr hDeviceInfoSet, ref SP_DEVINFO_DATA deviceInfoData, uint scope,
            uint hwProfile, uint parameterRegistryValueKind, uint samDesired);

        [DllImport("kernel32.dll")]
        private static extern Int32 GetLastError();

        public static IntPtr hDeviceInfoSet = SetupDiGetClassDevs(IntPtr.Zero, null, IntPtr.Zero, DIGCF_PRESENT | DIGCF_ALLCLASSES); 

        public struct DeviceInfo 
        {
            public SP_DEVINFO_DATA devInfo;
            public string description; 
            public string devClass; 
            public string devLoc; 
            public string devMFG;
            public string hardwareID; 
        }

        public static bool DisableDevice(SP_DEVINFO_DATA sdd, bool bEnable)
        {
            SP_DEVINFO_DATA devinfo_data = sdd;
            try
            {
                int szOfPcp;
                IntPtr ptrToPcp;
                int szDevInfoData;
                IntPtr ptrToDevInfoData;

                SP_PROPCHANGE_PARAMS pcp = new SP_PROPCHANGE_PARAMS();

                if (bEnable)
                {
                    pcp.ClassInstallHeader.cbSize = (uint)Marshal.SizeOf(typeof(SP_CLASSINSTALL_HEADER)); 
                    pcp.ClassInstallHeader.InstallFunction = DIF_PROPERTYCHANGE;
                    pcp.StateChange = DICS_ENABLE;
                    pcp.Scope = DICS_FLAG_GLOBAL;
                    pcp.HwProfile = 0;
                    szOfPcp = Marshal.SizeOf(pcp);
                    ptrToPcp = Marshal.AllocHGlobal(szOfPcp);
                    Marshal.StructureToPtr(pcp, ptrToPcp, true);
                    szDevInfoData = Marshal.SizeOf(devinfo_data);
                    ptrToDevInfoData = Marshal.AllocHGlobal(szDevInfoData);

                    if (SetupDiSetClassInstallParams(hDeviceInfoSet, ref devinfo_data, ptrToPcp, Marshal.SizeOf(typeof(SP_PROPCHANGE_PARAMS)))) 
                    {
                        SetupDiCallClassInstaller(DIF_PROPERTYCHANGE, hDeviceInfoSet, ref devinfo_data); 
                    }
                }
                else
                {

                    pcp.ClassInstallHeader.cbSize = (uint)Marshal.SizeOf(typeof(SP_CLASSINSTALL_HEADER));
                    pcp.ClassInstallHeader.InstallFunction = DIF_PROPERTYCHANGE;
                    pcp.StateChange = DICS_DISABLE;
                    pcp.Scope = DICS_FLAG_CONFIGSPECIFIC;
                    pcp.HwProfile = 0;
                }
                szOfPcp = Marshal.SizeOf(pcp);
                ptrToPcp = Marshal.AllocHGlobal(szOfPcp);
                Marshal.StructureToPtr(pcp, ptrToPcp, true);
                szDevInfoData = Marshal.SizeOf(devinfo_data);
                ptrToDevInfoData = Marshal.AllocHGlobal(szDevInfoData);
                Marshal.StructureToPtr(devinfo_data, ptrToDevInfoData, true);

                bool rslt1 = SetupDiSetClassInstallParams(hDeviceInfoSet, ref devinfo_data, ptrToPcp, Marshal.SizeOf(typeof(SP_PROPCHANGE_PARAMS))); 
                bool rstl2 = SetupDiCallClassInstaller(DIF_PROPERTYCHANGE, hDeviceInfoSet, ref devinfo_data); 
              
                if ((!rslt1) || (!rstl2))
                {
                    throw new Exception("Unable to change device state!");
                }
                else
                {
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
