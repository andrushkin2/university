using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab3Hook
{
    class hookClass
    {
        public string key;
        public bool fade;
        public string emulate;
        public string runPocess;
        public string stopProcess;
        public void hookClasss(string key, bool fade, string emulate, string runPorcess, string stopProcess)
        {
            this.key = key;
            this.fade = fade;
            this.emulate = emulate;
            this.runPocess = runPorcess;
            this.stopProcess = stopProcess;
        }
    }
}
