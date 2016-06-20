using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace lab4WMI
{
    public class DeviceInfo
    {
        private const int DIGCF_ALLCLASSES = (0x00000004);
        private const int DIGCF_PRESENT = (0x00000002);

        private const int MAX_DEV_LEN = 1000;//The return value of maximum length

        private const int SPDRP_DEVICEDESC = (0x00000000);// DeviceDesc (R/W)
        private const int SPDRP_HARDWAREID = (0x00000001);// HardwareID (R/W)
        private const int SPDRP_COMPATIBLEIDS = (0x00000002);// CompatibleIDs (R/W)
        private const int SPDRP_UNUSED0 = (0x00000003);// unused
        private const int SPDRP_SERVICE = (0x00000004);// Service (R/W)
        private const int SPDRP_UNUSED1 = (0x00000005);// unused
        private const int SPDRP_UNUSED2 = (0x00000006);// unused
        private const int SPDRP_CLASS = (0x00000007);// Class (R--tied to ClassGUID)
        private const int SPDRP_CLASSGUID = (0x00000008);// ClassGUID (R/W)
        private const int SPDRP_DRIVER = (0x00000009);// Driver (R/W)
        private const int SPDRP_CONFIGFLAGS = (0x0000000A);// ConfigFlags (R/W)
        private const int SPDRP_MFG = (0x0000000B);// Mfg (R/W)
        private const int SPDRP_FRIENDLYNAME = (0x0000000C);// FriendlyName (R/W)
        private const int SPDRP_LOCATION_INFORMATION = (0x0000000D);// LocationInformation (R/W)
        private const int SPDRP_PHYSICAL_DEVICE_OBJECT_NAME = (0x0000000E);// PhysicalDeviceObjectName (R)
        private const int SPDRP_CAPABILITIES = (0x0000000F);// Capabilities (R)
        private const int SPDRP_UI_NUMBER = (0x00000010);// UiNumber (R)
        private const int SPDRP_UPPERFILTERS = (0x00000011);// UpperFilters (R/W)
        private const int SPDRP_LOWERFILTERS = (0x00000012);// LowerFilters (R/W)
        private const int SPDRP_BUSTYPEGUID = (0x00000013);// BusTypeGUID (R)
        private const int SPDRP_LEGACYBUSTYPE = (0x00000014);// LegacyBusType (R)
        private const int SPDRP_BUSNUMBER = (0x00000015);// BusNumber (R)
        private const int SPDRP_ENUMERATOR_NAME = (0x00000016);// Enumerator Name (R)
        private const int SPDRP_SECURITY = (0x00000017);// Security (R/W, binary form)
        private const int SPDRP_SECURITY_SDS = (0x00000018);// Security=(W, SDS form)
        private const int SPDRP_DEVTYPE = (0x00000019);// Device Type (R/W)
        private const int SPDRP_EXCLUSIVE = (0x0000001A);// Device is exclusive-access (R/W)
        private const int SPDRP_CHARACTERISTICS = (0x0000001B);// Device Characteristics (R/W)
        private const int SPDRP_ADDRESS = (0x0000001C);// Device Address (R)
        private const int SPDRP_UI_NUMBER_DESC_FORMAT = (0X0000001D);// UiNumberDescFormat (R/W)
        private const int SPDRP_DEVICE_POWER_DATA = (0x0000001E);// Device Power Data (R)
        private const int SPDRP_REMOVAL_POLICY = (0x0000001F);// Removal Policy (R)
        private const int SPDRP_REMOVAL_POLICY_HW_DEFAULT = (0x00000020);// Hardware Removal Policy (R)
        private const int SPDRP_REMOVAL_POLICY_OVERRIDE = (0x00000021);// Removal Policy Override (RW)
        private const int SPDRP_INSTALL_STATE = (0x00000022);// Device Install State (R)
        private const int SPDRP_LOCATION_PATHS = (0x00000023);// Device Location Paths (R)
        private const int SPDRP_BASE_CONTAINERID = (0x00000024);// Base ContainerID (R)

        private const int SPDRP_MAXIMUM_PROPERTY = (0x00000025);// Upper bound on ordinals

        [StructLayout(LayoutKind.Sequential)]
        private class SP_DEVINFO_DATA
        {
            public int cbSize;
            public Guid ClassGuid;
            public int DevInst;
            public ulong Reserved;
        };
        [DllImport("setupapi.dll")]
        private static extern Boolean SetupDiClassGuidsFromNameA(string ClassN, ref Guid guids, UInt32 ClassNameSize, ref UInt32 ReqSize);

        [DllImport("setupapi.dll")]
        private static extern IntPtr SetupDiGetClassDevsA(ref Guid ClassGuid, UInt32 Enumerator, IntPtr hwndParent, UInt32 Flags);

        [DllImport("setupapi.dll")]
        private static extern Boolean SetupDiEnumDeviceInfo(IntPtr DeviceInfoSet, UInt32 MemberIndex, SP_DEVINFO_DATA DeviceInfoData);

        [DllImport("setupapi.dll")]
        private static extern Boolean SetupDiDestroyDeviceInfoList(IntPtr DeviceInfoSet);

        [DllImport("setupapi.dll")]
        private static extern Boolean SetupDiGetDeviceRegistryPropertyA(IntPtr DeviceInfoSet, SP_DEVINFO_DATA DeviceInfoData, UInt32 Property, UInt32 PropertyRegDataType, StringBuilder PropertyBuffer, UInt32 PropertyBufferSize, IntPtr RequiredSize);

        [DllImport("setupapi.dll")]
        private static extern IntPtr SetupDiCreateDeviceInfoList(ref Guid ClassGuid, IntPtr hwndParent);

        /// <summary>
        /// The device type enum device information
        /// </summary>
        /// <param name="DeviceIndex"></param>
        /// <param name="ClassName"></param>
        /// <param name="DeviceName"></param>
        /// <returns></returns>
        public static int EnumerateDevices(UInt32 DeviceIndex, string ClassName, StringBuilder DeviceName, StringBuilder DeviceID, StringBuilder Mfg, StringBuilder IsInstallDrivers)
        {
            UInt32 RequiredSize = 0;
            Guid guid = Guid.Empty;
            Guid[] guids = new Guid[1];
            IntPtr NewDeviceInfoSet;
            SP_DEVINFO_DATA DeviceInfoData = new SP_DEVINFO_DATA();


            bool res = SetupDiClassGuidsFromNameA(ClassName, ref guids[0], RequiredSize, ref RequiredSize);
            if (RequiredSize == 0)
            {
                //Type is not correct
                DeviceName = new StringBuilder("");
                return -2;
            }

            if (!res)
            {
                guids = new Guid[RequiredSize];
                res = SetupDiClassGuidsFromNameA(ClassName, ref guids[0], RequiredSize, ref RequiredSize);

                if (!res || RequiredSize == 0)
                {
                    //Type is not correct
                    DeviceName = new StringBuilder("");
                    return -2;
                }
            }

            //Obtaining equipment information by type
            NewDeviceInfoSet = SetupDiGetClassDevsA(ref guids[0], 0, IntPtr.Zero, DIGCF_PRESENT);
            if (NewDeviceInfoSet.ToInt32() == -1)
            {
                //The device is not available
                DeviceName = new StringBuilder("");
                return -3;
            }

            DeviceInfoData.cbSize = 28;
            //The normal state
            DeviceInfoData.DevInst = 0;
            DeviceInfoData.ClassGuid = System.Guid.Empty;
            DeviceInfoData.Reserved = 0;

            res = SetupDiEnumDeviceInfo(NewDeviceInfoSet,
                   DeviceIndex, DeviceInfoData);
            if (!res)
            {
                //No equipment
                SetupDiDestroyDeviceInfoList(NewDeviceInfoSet);
                DeviceName = new StringBuilder("");
                return -1;
            }



            DeviceName.Capacity = MAX_DEV_LEN;
            DeviceID.Capacity = MAX_DEV_LEN;
            Mfg.Capacity = MAX_DEV_LEN;
            IsInstallDrivers.Capacity = MAX_DEV_LEN;
            if (!SetupDiGetDeviceRegistryPropertyA(NewDeviceInfoSet, DeviceInfoData,
            SPDRP_FRIENDLYNAME, 0, DeviceName, MAX_DEV_LEN, IntPtr.Zero))
            {
                res = SetupDiGetDeviceRegistryPropertyA(NewDeviceInfoSet,
                 DeviceInfoData, SPDRP_DEVICEDESC, 0, DeviceName, MAX_DEV_LEN, IntPtr.Zero);
                if (!res)
                {
                    //Type is not correct
                    SetupDiDestroyDeviceInfoList(NewDeviceInfoSet);
                    DeviceName = new StringBuilder("");
                    return -4;
                }
            }
            //Device ID
            bool resHardwareID = SetupDiGetDeviceRegistryPropertyA(NewDeviceInfoSet,
             DeviceInfoData, SPDRP_HARDWAREID, 0, DeviceID, MAX_DEV_LEN, IntPtr.Zero);
            if (!resHardwareID)
            {
                //Device ID unknown
                DeviceID = new StringBuilder("");
                DeviceID.Append("Unknown");
            }
            //Equipment supplier
            bool resMfg = SetupDiGetDeviceRegistryPropertyA(NewDeviceInfoSet,
             DeviceInfoData, SPDRP_MFG, 0, Mfg, MAX_DEV_LEN, IntPtr.Zero);
            if (!resMfg)
            {
                //The equipment supplier of unknown
                Mfg = new StringBuilder("");
                Mfg.Append("Unknown");
            }
            //Whether the device driver installation
            bool resIsInstallDrivers = SetupDiGetDeviceRegistryPropertyA(NewDeviceInfoSet,
             DeviceInfoData, SPDRP_DRIVER, 0, IsInstallDrivers, MAX_DEV_LEN, IntPtr.Zero);
            if (!resIsInstallDrivers)
            {
                //Whether the device driver installation
                IsInstallDrivers = new StringBuilder("");
            }
            //The release of the current device memory
            SetupDiDestroyDeviceInfoList(NewDeviceInfoSet);
            return 0;
        }
        /// <summary>
        /// To obtain the unknown device information
        /// </summary>
        /// <param name="DeviceIndex"></param>
        /// <param name="ClassName"></param>
        /// <param name="DeviceName"></param>
        /// <returns></returns>
        public static int EnumerateDevices(List<string> NameList, List<string> IDList, List<string> MfgList, List<string> TypeList, 
            List<string> IsInstallDriversList, List<string> classGuids, List<string> friendName, List<string> isInstallDevices, List<string> locationList, List<string> hardWareId)
        {
            Guid myGUID = System.Guid.Empty;
            IntPtr hDevInfo = SetupDiGetClassDevsA(ref myGUID, 0, IntPtr.Zero, DIGCF_ALLCLASSES);

            if (hDevInfo.ToInt32() == -1)
            {
                //The device is not available

                return -3;
            }
            SP_DEVINFO_DATA DeviceInfoData = new SP_DEVINFO_DATA();
            DeviceInfoData.cbSize = 28;
            //The normal state
            DeviceInfoData.DevInst = 0;
            DeviceInfoData.ClassGuid = System.Guid.Empty;
            DeviceInfoData.Reserved = 0;
            UInt32 i;
            for (i = 0; SetupDiEnumDeviceInfo(hDevInfo, i, DeviceInfoData); i++)
            {
                //The device name
                StringBuilder DeviceName = new StringBuilder("");
                //Device ID
                StringBuilder DeviceID = new StringBuilder("");
                //Equipment supplier
                StringBuilder Mfg = new StringBuilder("");
                //The device type
                StringBuilder DeviceType = new StringBuilder("");
                //The device type
                StringBuilder IsInstallDrivers = new StringBuilder("");
                //The device GUID class
                StringBuilder ClassGIUD = new StringBuilder("");
                //The device fiendlyName
                StringBuilder friendlyName = new StringBuilder("");
                //The install state
                StringBuilder isInstall = new StringBuilder("");
                //The hardware id
                StringBuilder hardware = new StringBuilder("");
                DeviceName.Capacity = MAX_DEV_LEN;
                hardware.Capacity = MAX_DEV_LEN;
                DeviceID.Capacity = MAX_DEV_LEN;
                DeviceType.Capacity = MAX_DEV_LEN;
                Mfg.Capacity = MAX_DEV_LEN;
                IsInstallDrivers.Capacity = MAX_DEV_LEN;
                ClassGIUD.Capacity = MAX_DEV_LEN;
                friendlyName.Capacity = MAX_DEV_LEN;
                isInstall.Capacity = MAX_DEV_LEN;
                bool resName = SetupDiGetDeviceRegistryPropertyA(hDevInfo, DeviceInfoData, SPDRP_DEVICEDESC, 0, DeviceName, MAX_DEV_LEN, IntPtr.Zero);
                if (!resName)
                {
                    //The device name unknown
                    DeviceName = new StringBuilder("");
                }
                bool resClass = SetupDiGetDeviceRegistryPropertyA(hDevInfo, DeviceInfoData, SPDRP_CLASS, 0, DeviceType, MAX_DEV_LEN, IntPtr.Zero);
                if (!resClass)
                {
                    //The device type is unknown
                    DeviceType = new StringBuilder("");
                }
                //Device ID
                bool resHardwareID = SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                 DeviceInfoData, SPDRP_HARDWAREID, 0, DeviceID, MAX_DEV_LEN, IntPtr.Zero);
                if (!resHardwareID)
                {
                    //Device ID unknown
                    DeviceID = new StringBuilder("");
                }
                //SPDRP_CLASSGUID
                if (!SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                 DeviceInfoData, SPDRP_CLASSGUID, 0, ClassGIUD, MAX_DEV_LEN, IntPtr.Zero))
                {
                    ClassGIUD = new StringBuilder("");
                }
                //SPDRP_FRIENDLYNAME
                if (!SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                 DeviceInfoData, SPDRP_FRIENDLYNAME, 0, friendlyName, MAX_DEV_LEN, IntPtr.Zero))
                {
                    friendlyName = new StringBuilder("");
                }
                //SPDRP_INSTALL_STATE
                if (!SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                 DeviceInfoData, SPDRP_INSTALL_STATE, 0, isInstall, MAX_DEV_LEN, IntPtr.Zero))
                {
                    isInstall = new StringBuilder("");
                }
                //SPDRP_HARDWAREID
                if (!SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                DeviceInfoData, SPDRP_HARDWAREID, 0, hardware, MAX_DEV_LEN, IntPtr.Zero))
                {
                    hardware = new StringBuilder("");
                }
                //Equipment supplier
                bool resMfg = SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                 DeviceInfoData, SPDRP_MFG, 0, Mfg, MAX_DEV_LEN, IntPtr.Zero);
                if (!resMfg)
                {
                    //The equipment supplier of unknown
                    Mfg = new StringBuilder("");
                }
                //SPDRP_LOCATION_INFORMATION
                StringBuilder location = new StringBuilder("");
                location.Capacity = MAX_DEV_LEN;
                if (!SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                 DeviceInfoData, SPDRP_LOCATION_PATHS, 0, location, MAX_DEV_LEN, IntPtr.Zero))
                {
                    location = new StringBuilder("");
                }

                bool resIsInstallDrivers = SetupDiGetDeviceRegistryPropertyA(hDevInfo,
                 DeviceInfoData, SPDRP_DRIVER, 0, IsInstallDrivers, MAX_DEV_LEN, IntPtr.Zero);
                if (!resIsInstallDrivers)
                {
                    //Whether the device driver installation
                    IsInstallDrivers = new StringBuilder("");
                }

                if (!string.IsNullOrEmpty(DeviceName.ToString()) && !string.IsNullOrEmpty(DeviceID.ToString()))
                {
                    TypeList.Add(string.IsNullOrEmpty(DeviceType.ToString()) ? "Other equipment" : DeviceType.ToString());
                    NameList.Add(DeviceName.ToString());
                    IDList.Add(DeviceID.ToString());
                    MfgList.Add(Mfg.ToString());
                    IsInstallDriversList.Add(IsInstallDrivers.ToString());
                    classGuids.Add(ClassGIUD.ToString());
                    locationList.Add(location.ToString());
                    friendName.Add(friendlyName.ToString());
                    isInstallDevices.Add(isInstall.ToString());
                    hardWareId.Add(hardware.ToString());
                }
            }
            //The release of the current device memory
            SetupDiDestroyDeviceInfoList(hDevInfo);
            return 0;
        }
    }
}
