//Tạo mảng mới
const STRS = [
    {
        id:1, PVWMax: 7.5, PVDirect:1, PVW:4
    },
    {
        id:2, PVWMax: 7.5, PVDirect:1, PVW:9
    },
    {
        id:3, PVWMax: 7.5, PVDirect:1, PVW:8.5
    },
    {
        id:4, PVWMax: 7.5, PVDirect:0, PVW:9
    },
    {
        id:5, PVWMax: 7.5, PVDirect:0, PVW:3
    },
    {
        id:6, PVWMax: 7.5, PVDirect:0, PVW:9.5
    }
]
// Tìm String cùng hướng & cùng kWp
const reduced1 = STRS.reduce((prev, curr) => {
    const key = `${curr.PVWMax}, ${curr.PVDirect}`
    return {
        ...prev,
        [key]: [...(prev[key] || []), curr]
    }
},{})
const STRsame = Object.values(reduced1).filter(v => v.length > -1)
const flatted1 = STRsame.flat()

// Tìm string lớn nhất trong số các string cùng hướng & cùng kWp
const reduced = STRS.reduce((prev, curr) => {
    const key = `${curr.PVDirect}, ${curr.PVWMax}`
    return {
        ...prev,
        [key]: [(prev[key] < curr[key]) ? prev : curr]
    }
},{})
const STRMax = Object.values(reduced).filter(v => v.length > -1)
const flatted = STRMax.flat()

// Tính số % của từng string đối với string có CS lớn nhất
var PVPercent=[]
for (var i = 0; i < STRMax.length; i++){
    for (var j=0 ; j < STRsame[i].length; j++){
        let element = (STRsame[i][j].PVW/STRMax[i][0].PVW).toFixed(3);
        PVPercent.push(element)
    }
}
console.log(PVPercent)
// Get PVPercent vào mảng STRS
function getSTRS(STRS) {
    return {
        id: STRS.id,
        PVWMax: STRS.PVWMax,
        PVW: STRS.PVW,
        PVDirect: STRS.PVDirect,
        PVPercent: PVPercent.shift()
        
    }
};
var newSTRS = STRS.map(getSTRS);

// Tìm string có percent nhỏ hơn
var targetSTR = newSTRS.filter(function(targetSTR,index){
    return targetSTR.PVPercent <=0.9;
});

console.log(STRS)
console.log(newSTRS)

for (let i=0; i< targetSTR.length; i++){
    console.log("String " + targetSTR[i].id + " Degradation")
}