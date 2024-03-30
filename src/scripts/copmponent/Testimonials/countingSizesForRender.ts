import { SizeScreen } from "../../utils/types"

export function countingFlexBasis(){
    const width = window.innerWidth
            
    let gapSize = 49
    let marginSize = 65
    let widthTesWrap = width - 2 * gapSize - 2 * marginSize
    let maxWidthWrap = SizeScreen.desktop - 2 * gapSize - 2 * marginSize
    let flexBasis = 25.88 - ((maxWidthWrap - widthTesWrap) / 130)
            
    if (width <= SizeScreen.mobile){
        gapSize = 20
        marginSize = 20
        widthTesWrap = width - 2 * marginSize
        maxWidthWrap = SizeScreen.mobile - 2 * marginSize
        flexBasis = 89.4 - ((maxWidthWrap - widthTesWrap) / 30)
                
    } else if(width <= SizeScreen.tablet){
        gapSize = 25
        marginSize = 30
        widthTesWrap = width - 2 * marginSize
        maxWidthWrap = SizeScreen.tablet - 2 * marginSize
        flexBasis = 95 - ((maxWidthWrap - widthTesWrap) / 70)
                
    } else if(width <= SizeScreen.tabletBigger){
        gapSize = 35
        marginSize = 55
        widthTesWrap = width - gapSize - 2 * marginSize
        maxWidthWrap = SizeScreen.tabletBigger - 2 * gapSize - 2 * marginSize
        flexBasis = 44.8 - ((maxWidthWrap - widthTesWrap) / 130) 
                
    } else if (SizeScreen.desktop <= width) {
        flexBasis = 25.88 
    } 
    return flexBasis
}

export function countingGapSize(){
    const width = window.innerWidth        
    let gapSize = 49       
    if (width <= SizeScreen.mobile){
        gapSize = 20
    } else if(width <= SizeScreen.tablet){
        gapSize = 25
    } else if(width <= SizeScreen.tabletBigger){
        gapSize = 35
    } 
    return gapSize
}