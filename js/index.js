var btn = document.getElementById("btn");
var activecam = document.getElementById("activecam");
var cameraname = document.getElementById("cameraname");

if (btn.clicked != true) {
  activecam.style.display = "none";
  cameraname.style.display = "none";
}

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
 generateContent();
