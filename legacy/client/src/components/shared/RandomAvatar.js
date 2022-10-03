import React, { useEffect, useState } from 'react'
import Avatar from 'avataaars'

const RandomAvatar = ({width, height}) => {
    const topTypeList = ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairCurvy", "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand", "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand", "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle", "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar", "ShortHairTheCaesarSidePart"];
    const accessoriesList =  ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"];
    const hairColorList = ["Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "PastelPink", "Platinum", "Red", "SilverGray"];
    const hatColorList = ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"];
    const facialHairTypeList = ["Blank", "BeardMedium", "BeardLight", "BeardMagestic", "MoustacheFancy", "MoustacheMagnum"];
    const clotheTypeList = ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"];
    const eyeTypeList = ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side", "Squint", "Surprised", "Wink", "WinkWacky"];
    const eyebrowTypeList =  ["Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"];
    const mouthTypeList = ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"];
    const skinColorList = ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"];

    const randomSelector = length => Math.floor(Math.random() * length);

    const [topType, setTopType] = useState('');
    const [accessories, setAccessories] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [hatColor, setHatColor] = useState('');
    const [facialHairType, setFacialHairType] = useState('');
    const [clotheType, setClotheType] = useState('');
    const [eyeType, setEyeType] = useState('');
    const [eyebrowType, setEyebrowType] = useState('');
    const [mouthType, setMouthType] = useState('');
    const [skinColor, setSkinColor] = useState('');

    useEffect(()=> {
        setTopType(topTypeList[randomSelector(topTypeList.length)]);
        setAccessories(accessoriesList[randomSelector(accessoriesList.length)]);
        setHairColor(hairColorList[randomSelector(hairColorList.length)]);
        setHatColor(hatColorList[randomSelector(hatColorList.length)]);
        setFacialHairType(facialHairTypeList[randomSelector(facialHairTypeList.length)]);
        setClotheType(clotheTypeList[randomSelector(clotheTypeList.length)]);
        setEyeType(eyeTypeList[randomSelector(eyeTypeList.length)]);
        setEyebrowType(eyebrowTypeList[randomSelector(eyebrowTypeList.length)]);
        setMouthType(mouthTypeList[randomSelector(mouthTypeList.length)]);
        setSkinColor(skinColorList[randomSelector(skinColorList.length)]);
    }, []);

    return (
        <Avatar
            style={{width, height}}
            avatarStyle="Circle"
            topType={topType}
            accessoriesType={accessories}
            hairColor={hairColor}
            hatColor={hatColor}
            facialHairType={facialHairType}
            clotheType={clotheType}
            eyeType={eyeType}
            eyebrowType={eyebrowType}
            mouthType={mouthType}
            skinColor={skinColor}
        />
    );
};

export default RandomAvatar;