using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab3Hook
{
    public class hookClass
    {
        public string key;
        public int keyCode;
        public bool fade;
        public string emulate;
        public string runPocess;
        public string stopProcess;
        private bool isEmptyClass;
        public hookClass()
        {
            this.keyCode = -1;
            this.isEmptyClass = true;
        }
        public hookClass(string key, int keyCode, bool fade, string emulate, string runPorcess, string stopProcess)
        {
            this.key = key;
            this.keyCode = keyCode;
            this.fade = fade;
            this.emulate = emulate;
            this.runPocess = runPorcess;
            this.stopProcess = stopProcess;
            this.isEmptyClass = false;
        }
        public bool isClassEmpty()
        {
            return this.isEmptyClass;
        }
    }
}
