function generateContent() { 
   var app = new Vue({ 
   el: '#app', 
   data: { 
     scanner: null, 
     activeCameraId: null, 
     cameras: [], 
     scans: [] 
   }, 
   mounted: function () {
     var self = this; 
     self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 7 }); 
     self.scanner.addListener('scan', function (content, image) { 
       self.scans.unshift({ date: +(Date.now()), content: content }); 
     }); 
     Instascan.Camera.getCameras().then(function (cameras) { 
       self.cameras = cameras; 
       if (cameras.length > 0) { 
         self.activeCameraId = cameras[cameras.length-1].id; 
         self.scanner.start(cameras[cameras.length-1]); 
       } else { 
         console.error('No cameras found.'); 
       } 
     }).catch(function (e) { 
       console.error(e); 
     }); 
   }, 
   methods: { 
     formatName: function (name) { 
       return name || '(unknown)'; 
     },
     selectCamera: function (camera) { 
       this.activeCameraId = camera.id; 
       this.scanner.start(camera); 
     }
   } 
 }); 
 }

function scanQR() {
     var btn = document.getElementById("btn");
     var cameralist = document.getElementById("cameralist");
     var scancontent = document.getElementById("scancontent");
     cameralist.style.visibility = "visible";
     scancontent.style.visibility = "visible";
     generateContent();
}
