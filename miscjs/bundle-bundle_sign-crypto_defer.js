/*
* This is Crypto Utility implementations. It contains necessary classes and methods useful for the Crypto Library
* This may be required by almost every other algorithms
*/


if(typeof(SCrypto) == 'undefined'){
         SCrypto = { };
    }

/**
* The object contains some crypto operation modes
*/
if(typeof(SCrypto.CipherMode) == 'undefined'){
    SCrypto.CipherMode = { };
}

SCrypto.CipherMode.ECB = 0; // (Electronic CodeBook)
SCrypto.CipherMode.CBC = 1; // (Cipher Block Chaining)
SCrypto.CipherMode.CFB = 2; // (Cipher FeedBack)
SCrypto.CipherMode.OFB = 3; // (Output FeedBack)


/**
* The object contains some crypto padding modes
*/
if(typeof(SCrypto.PaddingMode) == 'undefined'){
    SCrypto.PaddingMode = { };
}

SCrypto.PaddingMode.None  = -1; // no padding
SCrypto.PaddingMode.Zeros = 0; // Zeros padding
SCrypto.PaddingMode.PKCS7 = 1; // PKCS7 padding
SCrypto.PaddingMode.PKCS1v1_5 = 2; // PKCS1 v1.5 padding for RSA




/**
* The Exception class
*/
SCrypto.Exception = function(obj,errorCode){
    this.sender = obj;
    this.errorCode = errorCode;
};

SCrypto.Exception.prototype = {
    getErrorCode : function(){
        return this.errorCode;
    },

    getMessage : function(){
        return this.sender.getErrorMessage(this.errorCode);
    },
    getExceptionClass : function(){
        return this.sender.getClass();
    }
};
// Error codes
SCrypto.Exception.Dependencies             = 1;
SCrypto.Exception.InvalidKey               = 2;
SCrypto.Exception.InvalidIV                = 3;
SCrypto.Exception.ModeNotSupported         = 4;
SCrypto.Exception.PaddingModeNotSupported  = 5;
SCrypto.Exception.InvalidMessage           = 6;
SCrypto.Exception.InvalidPadding           = 7;
SCrypto.Exception.HashAlgoNotSupported     = 8;
SCrypto.Exception.CheckSumError            = 9;
SCrypto.Exception.SignError                = 10;
SCrypto.Exception.PublicKeyCreationError   = 11;
SCrypto.Exception.AlgoNotSupported         = 12;
SCrypto.Exception.KeyNotFound              = 13;
SCrypto.Exception.SignatureVerificationError     = 14;
SCrypto.Exception.TypeNotSupported  = 15;





/**
* The object contains some crypto utilility functions
*/
if(typeof(SCrypto.CryptoUtils) == 'undefined'){
    SCrypto.CryptoUtils = { };
}



/**
 * The class to create a closure helping to run the method of a particular object later
 * @param {Object} obj - the object to make the closure
 * @param {Object} method - the method of the above object to execute
 * @param {Object} args - the arguments of the above method
 */
SCrypto.CryptoUtils.createClosure = function(obj,method,args){
            return function() {
                     var callArgs = args || arguments;
                     return method.apply(obj, [callArgs]);
            };
 };

/**
* Convert a byte array into a string
* @param {ByteArray} a - a byte array
* @return {string} the converted string
*/
SCrypto.CryptoUtils.byteArrayToString = function(a){
  var s = "";

  for (var i = 0; i<a.length; i++)
  {
    s = s + String.fromCharCode(a[i]);
  }

  return s;

};



/**
* Convert a string to byte array
* @param {string} s - a string
* @return {byte array} the converted byte array
*/
SCrypto.CryptoUtils.stringToByteArray = function(s){
  var a = [];

  for (var i = 0; i<s.length; i++)
  {
    a[i] = s.charCodeAt(i);
  }

  return a;

};



/**
* Convert a string into a hex string
* @param {String} s - a string
* @return {string} the hex string
*/
SCrypto.CryptoUtils.stringToHex = function(s) {
  var r = "",t;
  var h = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
  for (var i=0; i<s.length; i++) {
    t = s.charCodeAt(i);
    r += h [t >> 4] + h [t & 0xf];
  }
  return r;
};





/**
* Convert a hex string into a string
* @param {String} h - a hex string
* @return {string} the string
*/
SCrypto.CryptoUtils.hexToString = function(h) {
  var i,r = "";
  for (i= (h.substr(0, 2)=="0x")?2:0; i<h.length; i+=2) {r += String.fromCharCode (parseInt (h.substr (i, 2), 16));}
  return r;
};

/**
* Check to see if a string contains only the Hexa character of not.
* @param {String} s - the string to check
* @return {Boolean} - true or false
*/
SCrypto.CryptoUtils.isHexString = function(s)
{
    var i,hex = "0123456789ABCDEF";

    if (typeof(s) != 'string'){
        return false;
    }
    s = s.toUpperCase();
    for (i = 0; i < s.length; i++) {
        if  (hex.indexOf(s.charAt(i)) < 0) {
            return false;
        }
     }
    return true;
};

/**
 * Convert byte array to a hex string
 * e.g var array = [1,2,3] will be converted to "010203"
 * @param {Array} byteArray An array of bytes
 * @return {String} Hex string representation
 */
SCrypto.CryptoUtils.byteArrayToHexString = function(byteArray){
    var str = '',tmpStr;
    for(var i=0;i<byteArray.length;i++){
        tmpStr = byteArray[i].toString(16);
        if(tmpStr.length < 2){
            str += "0";
        }
        str += tmpStr;
    }
    return str.toUpperCase();
};



/**
 * Convert number to a hex string. (note toString(16) is implementation-dependant, and
 *  in IE returns signed numbers when used on full words)
 * @param {Integer} number - a number
 * @return {String} Hex string representation
 */
SCrypto.CryptoUtils.numberToHexString = function(number){
    var s="", v;
    for (var i=7; i>=0; i--) { v = (number>>>(i*4)) & 0xf; s += v.toString(16); }

    // remove extra 00 at the beginning
    s = s.toUpperCase();

    while (s.length > 2) {
        if (s.substring(0,2) == "00"){
            s = s.substring(2,s.length);
        } else {
            break;
        }
     }
    return s;
};

/**
 * Convert a hex string to byte array. For eg
 * var str = "010203" will be converted to [1,2,3]
 * @param {String} hexString A Hex String.
 * @return {Array} A byte array
 */
SCrypto.CryptoUtils.hexStringToByteArray = function(hexString){
     var i,byteArray = [];
     if (hexString.length % 2) {            // must have even length
         return;
     }
    for (i = 0; i<hexString.length; i += 2) {
        byteArray[Math.floor(i/2)] = parseInt(hexString.slice(i, i+2), 16);
    }
    return byteArray;
};


// function and parameters for base64 encoding stuff
SCrypto.CryptoUtils.b64s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
/**
 * Convert a string to base64 encoding.
 * @param {String} t -  A  String.
 * @return {String} base64 encoding
 */
SCrypto.CryptoUtils.string2base64 = function(t){
     var a, c, n;
     var r='', l=0, s=0,b64s = SCrypto.CryptoUtils.b64s;
     var tl=t.length;
     for(n=0; n<tl; n++){
      c=t.charCodeAt(n);
      if(s == 0){
        r+=b64s.charAt((c>>2)&63);
        a=(c&3)<<4;
      }else if(s==1){
        r+=b64s.charAt((a|(c>>4)&15));
        a=(c&15)<<2;
      }else if(s==2){
        r+=b64s.charAt(a|((c>>6)&3));        l+=1;
        if((l%60)==0){            r+="\n";        }        r+=b64s.charAt(c&63);      }
      l+=1;
      if((l%60)==0){r+="\n";}
      s+=1;
      if(s==3){s=0;}
     }

     if(s>0){
      r+=b64s.charAt(a);
      l+=1;
      if((l%60)==0){r+="\n";}
      r+='=';
      l+=1;
     }
     if(s==1){
      if((l%60)==0){r+="\n";}
      r+='=';
     }

     return r;
};/**
 * Convert a base64 encoded string to string.
 * @param {String} t -  A  base64 encoded string.
 * @return {String} string
 */
SCrypto.CryptoUtils.base642string = function(t){
     var c, n,b64s = SCrypto.CryptoUtils.b64s;
     var r='', s=0, a=0;
     var tl=t.length;     for(n=0; n<tl; n++){
        c=b64s.indexOf(t.charAt(n));
        if(c >= 0){
            if(s){r+=String.fromCharCode(a | (c>>(6-s))&255);}
            s=(s+2)&7;
            a=(c<<s)&255;
        }
     }
     return r;
};

/**
* Calculate the CRC Checksum of a message
*
* @param {String} message to calculate the checksum
* @return {String} CRC Checksum
*/
SCrypto.CryptoUtils.crc_Checksum = function(st){
    var crc = 0xB704CE;
    var  i,c,j = 0;
    var len = st.length;

    while (j<len) {
        c = st.charCodeAt(j);
        // crc ^= c << 16;
        crc = crc ^ (c << 16);
        for (i = 0; i < 8; i++) {
            //crc <<= 1;
            crc = crc << 1;
            if ((crc & 0x1000000)> 0){
                crc = crc ^ 0x864CFB;
            }
        }
        j = j+1;
    }
    crc =  crc & 0xFFFFFF;
    var b1 = crc >> 16;
    var t = crc >> 8;
    t = t * 0x100;
    var b3  = crc ^ t;

    t = b1 * 0x10000 + b3;;
    var b2 = ( crc ^ t) >> 8;

    var str_crc = "";
    str_crc += String.fromCharCode(b1);
    str_crc +=  String.fromCharCode(b2);
    str_crc +=   String.fromCharCode(b3);

    return str_crc;
};


/**
 * The class to create a closure helping to run the method of a particular object later
 * @param {Object} obj - the object to make the closure
 * @param {Object} method - the method of the above object to execute
 * @param {Object} args - the arguments of the above method
 */
SCrypto.CryptoUtils.createDelegate = function(obj,method,args){
            return function() {
                     var callArgs = args || arguments;
                     return method.apply(obj, [callArgs]);
            };
 };

 /**
 * Copy array
 * @param {Object} src - the source
 * @param {int} src_i - the source index
 * @param {Object} dest - the destination
 * @param {int} dest_i - the destination index
 * @param {int} len - the length
 */
 SCrypto.CryptoUtils.arrayCopy = function(src,src_i,dest,dest_i,len){
    for (var i = 0; i < len; i++){
        dest[dest_i + i] = src[src_i + i];
    }
 };


SCrypto.CryptoUtils.utf8 = {


   /**
    * public method for encoding a unicode string into UTF-8
    * @param {String} str - the Unicode string
    * @return {String} UTF-8 encoded string
  */
    encode : function (str) {

        var utf_8 = "";

        for (var n = 0; n < str.length; n++) {

            var c = str.charCodeAt(n);

            if (c < 128) {
                utf_8 += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utf_8 += String.fromCharCode((c >> 6) | 192);
                utf_8 += String.fromCharCode((c & 63) | 128);
            }
            else {
                utf_8 += String.fromCharCode((c >> 12) | 224);
                utf_8 += String.fromCharCode(((c >> 6) & 63) | 128);
                utf_8 += String.fromCharCode((c & 63) | 128);
            }

        }

        return utf_8;
    },

   /**
    * public method for decoding a UTF-8 string to a unicode string
    * @param {byte array} utf_8 -  UTF-8 encoded string
    * @return {String} the Unicode string
  */
    decode : function (utf_8) {
    	
        var str = "";
        var i = 0;
        var c = 0, c2 = 0, c3 = 0;

        while ( i < utf_8.length ) {

            c = utf_8.charCodeAt(i);

            if (c < 128) {
                str += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utf_8.charCodeAt(i+1);
                str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utf_8.charCodeAt(i+1);
                c3 = utf_8.charCodeAt(i+2);
                str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }
        return str;
    }

};


/**
 * Make the text end with <CR><LF>
 *
 * @param {String} text - the text
 * @return {String} text with <CR><LF> ending
 */
SCrypto.CryptoUtils.makeCRLFEnding = function(text){

        var newText = "";

        if (text.length === 0) {
            newText = text;
       }

        if (text.length == 1){
             if (text.charAt(0) == '\n'){
                 newText += "\r\n";
             } else {
                newText +=text.charAt(0);
             }
        }

        if (text.length > 1){ //text.length > 1

            for (var i = 0; i < text.length; i++){
                if (text.charAt(i) == '\n'){
                    if (i === 0){
                         newText += "\r\n";
                    } else {
                        if (text.charAt(i-1) != '\r'){
                              newText += "\r\n";
                        } else {
                            newText += "\n";
                        }
                    }
                } else {
                    newText += text.charAt(i);
                }
            }
       }
       return newText;
};

SCrypto.CryptoUtils.xor = function(in1, in2, in2offset, b){
    for (var i = 0; i < b; i++) {
        in1[i] ^= in2[in2offset + i];
    }
};

SCrypto.CryptoUtils.doTripleDES = function(data, key, encrypt, mode){
    var des = new SCrypto.DES();
    var result;
    var rgbIV = "0000000000000000";
    des.setParam(key, mode, rgbIV);

    if (encrypt) {
        result = des.encrypt(data);
    }
    else {
        result = des.decrypt(data);
    }

    return result;
};

SCrypto.CryptoUtils.computeRetailMAC_ASPSTD = function(sscString, data, key){
	// This is the calculation of Retail MAC as described in the IAS Classic specification
    // and here (http://groups.google.com/group/sci.crypt/browse_thread/thread/ceec25bdcd52529b/23b729288b39f5a6?lnk=st&q=MAC+ISO+9797#23b729288b39f5a6)
	// If I pass the test vectors to this method I get the expected result.
	//var k0 = SCrypto.CryptoUtils.hexStringToByteArray(key.substr(0, 16));
    //var k1 = SCrypto.CryptoUtils.hexStringToByteArray(key.substr(16, 16));
	var k0 = key.substr(0,16);
	var k1 = key.substr(16,16);
    
    // take the message and 
    // pad it

    data = data + "8000000000000000";

    // pad till it is even
    while ((data.length % 8) != 0)
    {
        data += "00";
    }

    var dataBytes = SCrypto.CryptoUtils.hexStringToByteArray(data);

    var numOfBlocks = dataBytes.length / 8;

    var iv = "0000000000000000";
    var xx = SCrypto.CryptoUtils.hexStringToByteArray(iv);
    
    for (var i = 0; i < numOfBlocks; i++)
    {
        var m = [0,0,0,0,0,0,0,0];
        SCrypto.CryptoUtils.arrayCopy(dataBytes, i * 8, m, 0, 8);
        SCrypto.CryptoUtils.xor(xx, m, 0, 8);
        
        var desI = new SCrypto.DES();
        desI.setParam(k0, SCrypto.CipherMode.ECB, iv)
        
        xx = SCrypto.CryptoUtils.byteArrayToHexString(xx);
        xx = desI.encrypt(xx);
        xx = SCrypto.CryptoUtils.hexStringToByteArray(xx);
    }

    des = new SCrypto.DES();
    des.setParam(k1, SCrypto.CipherMode.ECB, iv);
    xx = SCrypto.CryptoUtils.byteArrayToHexString(xx);
    xx = des.decrypt(xx);
    
    des = new SCrypto.DES();
    des.setParam(k0, SCrypto.CipherMode.ECB, iv);
    xx = des.encrypt(xx);
    
    return xx;
};

SCrypto.CryptoUtils.computeRetailMAC = function(sscString, data, key){

    var buffXor = [];
    var iv = "0000000000000000";
    var des = new SCrypto.DES();

    des.setParam(key.substr(0, 16), SCrypto.CipherMode.ECB, iv)

    var buffRes = des.encrypt(sscString);
    buffRes = SCrypto.CryptoUtils.hexStringToByteArray(buffRes);

    SCrypto.CryptoUtils.arrayCopy(buffRes, 0, buffXor, 0, 8);

    var xxbytes = SCrypto.CryptoUtils.hexStringToByteArray(data);

    var dwLen = xxbytes.length;

    var i = 0;

    while (i < dwLen) {
        if ((i + 8) > dwLen) {
            break;
        }

        SCrypto.CryptoUtils.xor(buffXor, xxbytes, i, 8);

        des = new SCrypto.DES();
        des.setParam(key.substr(0, 16), SCrypto.CipherMode.ECB, iv)

        var buffXor_str = SCrypto.CryptoUtils.byteArrayToHexString(buffXor);
        buffRes = des.encrypt(buffXor_str);
        buffRes = SCrypto.CryptoUtils.hexStringToByteArray(buffRes);

        SCrypto.CryptoUtils.arrayCopy(buffRes, 0, buffXor, 0, 8);

        i = i + 8;
    }

    if (xxbytes.length % 8 == 0) {
        SCrypto.CryptoUtils.xor(buffXor, [0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], 0, 8);
    }
    else {
        var tmp = [0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
        SCrypto.CryptoUtils.arrayCopy(xxbytes, xxbytes.length - (xxbytes.length % 8), buffRes, 0, xxbytes.length % 8);
        SCrypto.CryptoUtils.arrayCopy(tmp, 0, buffRes, xxbytes.length % 8, 8 - xxbytes.length % 8);
        SCrypto.CryptoUtils.xor(buffXor, buffRes, 0, 8);
    }

    return SCrypto.CryptoUtils.doTripleDES(SCrypto.CryptoUtils.byteArrayToHexString(buffXor), key, true, SCrypto.CipherMode.ECB);
};

SCrypto.CryptoUtils.incrementSSC = function(ssc){
    var sscBytes = SCrypto.CryptoUtils.hexStringToByteArray(ssc);

    for (var i = 8; i > 0; i--) {
        sscBytes[i - 1] += 0x01;
        if (sscBytes[i - 1] != 0x00)
            break;
    }

    return SCrypto.CryptoUtils.byteArrayToHexString(sscBytes);
};


/**
 * This is the ASN1 parsing class
 */

if(typeof(SCrypto) == 'undefined'){
         SCrypto = { };
}



SCrypto.ASN1 = function(){
    var type = ['EOC','BOOLEAN','INTEGER','BITSTRING','OCTETSTRING','NULL','OBJECTIDENTIFIER','ObjectDescripter','ENUMERATED','UTF8String','SEQUENCE','SET','NumericString','PrintableString','TeletexString','IA5String','UTCTime','GeneralizedTime'];
    var index = [0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x0a,0x0c,0x10,0x11,0x12,0x13,0x14,0x16,0x17,0x18];

    this.NAME = [];
    for (var i = 0; i < index.length; i++ ){
	    this.NAME[index[i]] = type[i];
    }  
    this.OID = [];
    this.TAB = "                              ";
    this.TAB_num = -1;
    this.Bitstring_hex_limit = 4;
};



SCrypto.ASN1.prototype = {
    utils : SCrypto.CryptoUtils,
   
   /*
    * Decode an DER encode data
    *@param{hex string}  data - DER encoded data
    *@return{String} - the parsed value of the data
    *
    */
   decode : function(data){
	    var point = 0;
	    var ret = "",indefinite;
	    this.TAB_num++;

	    while ( point < data.length ){

		    // Detecting TAG field (Max 1 octet)
		    var tag10 = parseInt("0x" + data.substr(point, 2),16);
	        var tagHex = data.substr(point, 2);
		    var isSeq = tag10 & 32;
		    var isContext = tag10 & 128;
		    var tag = tag10 & 31;
		    var tagName = isContext ? "[" + tag + "]" : this.NAME[tag];
		    
		    if ((tagName === "EOC") || (tagHex === "FF")) {
	            return ret;
	        }		    
		    
		    if ( tagName == "undefined" ){
			    tagName = "Unsupported_TAG";
		    }

		    point += 2;
		    indefinite = false;
		    // Detecting LENGTH field (Max 2 octets)

		    var len = 0;
		    if ( tag != 0x5){	// Ignore NULL
			    if ( parseInt("0x" + data.substr(point, 2),16) & 128){
				    var lenLength = parseInt("0x" + data.substr(point, 2),16) & 127;
				    if (lenLength > 0) {
				        if ( lenLength > 2 ){
					        
					        throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        					
				        }
				        len = parseInt("0x" + data.substr( point+2, lenLength*2),16);
				        point += lenLength*2 + 2;  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
			        } else {
			            // use indefinite form encoding
			            //Need search for the End-of-Contents data
			            // detect the length
			            indefinite = true;
			            point += 2;
			            len = this.detectUnknownLength(data,point);
			        }	    
			    }
			    else{  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
				    len = parseInt("0x" + data.substr(point,2),16);
				    point += 2;
			    }
    			
			    if ( len > data.length - point ){
                    throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        					
			    }
		    }
		    else{
			    point += 2;
		    }

		    // Detecting VALUE
    		
		    var val = "";
		    var tab = this.TAB.substr(0, this.TAB_num*3);
    		
    		
    		
		    if ( len ){
		        if (indefinite) {
			        val = data.substr( point, len*2 - 4);
			    } else {
			         val = data.substr( point, len*2);
			    }    
			    point += len*2;
		    }

		    ret += tab + tagName + " ";
		    if (tagName == "Unsupported_TAG"){
		        ret += val;
		        ret += "\n";
		    } else {
		    ret += ( isSeq ) ? "{\n" + this.decode(val) + tab + "}" : this.convertToRealValue( isContext ? 4 : tag , val);
		    ret += "\n";
	        }	
	    }
    	
	    this.TAB_num--;
	    return ret;
    },


  /*
    * Read an array of SEQUENCES from an DER encode data
    *@param{hex string}  data - DER encoded data
    *@return{Array} - the array of the Sequence
    *
    */
   ReadArrayOfSEQUENCE : function(data){
         var element; 
         var remaindata = data;
         var result = [];
         
         while (remaindata.length > 0){
	    if(remaindata.substr(0,2) == "00"){
		break;
	    }
            element = this.readValueAndRemainingData(remaindata,"SEQUENCE");   
            result[result.length] = remaindata.substr( 0, remaindata.length - element.remaindata.length); 
            remaindata = element.remaindata;
          }
         
         return result;
    },

   /*
    * Read a SEQUENCE from an DER encode data
    *@param{hex string}  data - DER encoded data
    *@return{Array} - the array of the elements in the Sequence
    *
    */
   ReadSEQUENCE : function(data){
 
        var sequence = this.readValueAndRemainingData(data,"SEQUENCE");   
        return this.ReadElements(sequence.value);
    },
    
   /*
    * Read a sequence of OCTETSTRING
    *@param{hex string}  value - DER encoded data
    *@return{string} - the OCTETSTRING value
    *
    */ 
   ReadSequenceOfOctetString : function(value){
        var result = "",tmp;
        do {
           tmp = this.readValueAndRemainingData(value,"OCTETSTRING");
           result +=  tmp.value;
           value = tmp.remaindata;
         }while(value !== "");   
         return result;
         
    },

   /*
    * Read the every elements from a DER encoded string
    *
    *@param{hex string}  data - DER encoded data
    *@return{Array} the array of elements in form of
                        { tag : tagName,   // tag
                         value : val,      // value
                         DER_Encoded : DER_Encoded  // original DER encoded
                        }
    */
  ReadElements : function(data){
	    var point = 0;
	    this.TAB_num++;
	    var ret = [];
	    var i = 0;
	    var begin_point,indefinite;

	    while ( point < data.length ){

		    // Detecting TAG field (Max 1 octet)
            begin_point = point;
            indefinite = false;
            
		    var tag10 = parseInt("0x" + data.substr(point, 2),16);
		    var tagHex = data.substr(point, 2);
		    var isSeq = tag10 & 32;
		    var isContext = tag10 & 128;
		    var tag = tag10 & 31;
		    var tagName = isContext ? "[" + tag + "]" : this.NAME[tag];
		    
		    if ((tagName === "EOC") || (tagHex === "FF")) {
	            return ret;
	        }
		    
		    if ( tagName == "undefined" ){
			    tagName = "Unsupported_TAG";
		    }

		    point += 2;
    		
		    // Detecting LENGTH field (Max 2 octets)

		    var len = 0;
		    if ( tag != 0x5){	// Ignore NULL
			    if ( parseInt("0x" + data.substr(point, 2),16) & 128 ){
				    var lenLength = parseInt("0x" + data.substr(point, 2),16) & 127;
				    if (lenLength > 0){
				        if ( lenLength > 2 ){
					        
					        throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        					
        					
				        }
				        len = parseInt("0x" + data.substr( point+2, lenLength*2),16);
				        point += lenLength*2 + 2;  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
			        }else { // 80
			            // use indefinite form encoding
			            //Need search for the End-of-Contents data
			            // detect the length
			            indefinite = true;
			            point += 2;
			            len = this.detectUnknownLength(data,point);
    			    
			        }	
			    }else {  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
				    len = parseInt("0x" + data.substr(point,2),16);
				    point += 2;
			    }
    			
			    if ( len > data.length - point ){
				   
					        throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        					
			    }
		    }
		    else{
			    point += 2;
		    }

		    // Detecting VALUE
    		
		    var val = "";
		    var DER_Encoded = "";
		    //var tab = this.TAB.substr(0, this.TAB_num*3);
		    if ( len ){
		        if (indefinite) {
			        val = data.substr( point, len*2 - 4);
			    } else {
			         val = data.substr( point, len*2);
			    }    
			    point += len*2;
			    DER_Encoded = data.substr(begin_point,point-begin_point);
		    }
    		
    		 
            val = ( isSeq ) ?  val : this.convertToRealValue( isContext ? 4 : tag , val);
              
            ret[i++] = { tag : tagName,
                         value : val,
                         DER_Encoded : DER_Encoded
                        
                        };
            
	    }// while
    	
	    this.TAB_num--;
	    return ret;
    },

     /*
    * Read the value of a tag providing that the tag starts at the beginning of the data
    * This one is almost the same of method readValue except that this one also returns 
    * the remaining data after the tag occupied value.
    *
    *@param{hex string} DER encoded data
    *@param{integer} tag - the tag
    *@return{Object} the data in the approriate form corresponding to the tag and the remaining data
    */
    readValueAndRemainingData : function(data,requiredtag){
	    var point = 0;
	    var ret = "",indefinite;
    	 
	    // Detecting TAG field (Max 1 octet)

	    var tag10 = parseInt("0x" + data.substr(point, 2),16);
	    var isSeq = tag10 & 32;
	    var isContext = tag10 & 128;
	    var tag = tag10 & 31;
	    var tagName = isContext ? "[" + tag + "]" : this.NAME[tag];
	    if ( tagName != requiredtag ){
			throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        }

	    point += 2;
	    indefinite = false;
	    // Detecting LENGTH field (Max 2 octets)

	    var len = 0;
	    if ( tag != 0x5){	// Ignore NULL
		    if ( parseInt("0x" + data.substr(point, 2),16) & 128 ){
			    var lenLength = parseInt("0x" + data.substr(point, 2),16) & 127;
			    if (lenLength > 0){
			        if ( lenLength > 2 ){
				       
					        throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        					
			        }
			        len = parseInt("0x" + data.substr( point+2, lenLength*2),16);
			        point += lenLength*2 + 2;  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
			    }else { // 80
			        // use indefinite form encoding
			        //Need search for the End-of-Contents data
			        // detect the length
			        point += 2;
			        len = this.detectUnknownLength(data,point);
			        indefinite = true;
			    }
		    }
		    else {  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
			    len = parseInt("0x" + data.substr(point,2),16);
			    point += 2;
		    }
    		
		    if ( len > data.length - point ){
				throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
            }
	    }
	    else{
		    point += 2;
	    }

	    // Detecting VALUE
    	
	    var val = "";
	    //var tab = this.TAB.substr(0, this.TAB_num*3);
	    if ( len ){
	       if (indefinite) {
		        val = data.substr( point, len*2 - 4); // minus the end-content 0000
		    } else {
		        val = data.substr( point, len *2);
		    }
		    point += len*2;   
	    }
        
	    var remaindata = data.substr( point, data.length-point);
	    ret += ( isSeq ) ?  val : this.convertToRealValue( isContext ? 4 : tag , val);
    		
	    return {
	            value : ret,
	            remaindata : remaindata
	        };
    },
    
     /*
    * Detect the unknown length of a tag in a specific point
    *
    *@param{hex string} DER encoded data
    *@param{integer} point - the starting index
    *@return{integer} the length
    */
    detectUnknownLength : function(data,point){
            //"TLV TLV TLV 0000"
            //end_content_count = 1;
            // search 0000 until end_content_count == 0
           var startpoint = point;
           
           while ( point < data.length ){

		        // Detecting TAG field (Max 1 octet)
               // begin_point = point;
                
		        var tag10 = parseInt("0x" + data.substr(point, 2),16);
		        //var isSeq = tag10 & 32;
		        var isContext = tag10 & 128;
		        var tag = tag10 & 31;
		        var tagName = isContext ? "[" + tag + "]" : this.NAME[tag];
		        if ( tagName == "undefined" ){
			        tagName = "Unsupported_TAG";
		        }

		        point += 2;
        		
		        // Detecting LENGTH field (Max 2 octets)

		        var len = 0;
		        if ( tag != 0x5){	// Ignore NULL
			        if ( parseInt("0x" + data.substr(point, 2),16) & 128 ){
				        var lenLength = parseInt("0x" + data.substr(point, 2),16) & 127;
				        if (lenLength > 0) {
				                if ( lenLength > 2 ){
					                throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        					    }
				                len = parseInt("0x" + data.substr( point+2, lenLength*2),16);
				                point += lenLength*2 + 2;  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
			            } else {
			                    // another unknown length
        			          
			                    point += 2;
			                    len = this.detectUnknownLength(data,point);
			            }
			        }else {  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
				        len = parseInt("0x" + data.substr(point,2),16);
				        point += 2;
			        }
        			
			        if ( len > data.length - point ){
				        
					        throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        			}
		        }
		        else{
			        point += 2;
		        }

		        // Detecting VALUE
        		
		        var val = "";
        		
		        if ( len ){
			        val = data.substr( point, len*2);
			        point += len*2;
		        }
        		
		        end_content = data.substr( point, 4);
        		
		        if (end_content == '0000') {
		            point += 4;
		            break;
		        } 	
                
	        }
           return (point - startpoint) / 2;
    
    },
    
    
    /*
    * Read the value of a tag providing that the tag starts at the beginning of the data
    *
    *@param{hex string} DER encoded data
    *@param{integer} tag - the tag
    *@return{} the data in the approriate form corresponding to the tag
    */
   readValue : function(data,requiredtag){

	    var point = 0;
	    var ret = "",indefinite;
    	 
	    // Detecting TAG field (Max 1 octet)

	    var tag10 = parseInt("0x" + data.substr(point, 2),16);
	    var isSeq = tag10 & 32;
	    var isContext = tag10 & 128;
	    var tag = tag10 & 31;
	    var tagName = isContext ? "[" + tag + "]" : this.NAME[tag];
	    if ( tagName != requiredtag ){
	        
		    throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        }

	    point += 2;
	    indefinite = false;
	    // Detecting LENGTH field (Max 2 octets)

	    var len = 0;
	    if ( tag != 0x5){	// Ignore NULL
		    if ( parseInt("0x" + data.substr(point, 2),16) & 128 ){
			    var lenLength = parseInt("0x" + data.substr(point, 2),16) & 127;
			    if (lenLength > 0) {
			        if ( lenLength > 2 ){
				        
					        throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        			}
			        len = parseInt("0x" + data.substr( point+2, lenLength*2),16);
			        point += lenLength*2 + 2;  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
    	        } else {
    	            // 80
			        // use indefinite form encoding
			        //Need search for the End-of-Contents data
			        // detect the length
			        point += 2;
			        len = this.detectUnknownLength(data,point);
			        indefinite = true;
    	        }
        	    	
		    }else {  // Special thanks to Mr.(or Ms.) T (Mon, 25 Nov 2002 23:49:29)
			    len = parseInt("0x" + data.substr(point,2),16);
			    point += 2;
		    }
    		
		    if ( len > data.length - point ){
			    
			    throw new SCrypto.Exception(this,SCrypto.Exception.InvalidMessage);
        	}
	    }
	    else{
		    point += 2;
	    }

	    // Detecting VALUE
    	
	    var val = "";
	    //var tab = this.TAB.substr(0, this.TAB_num*3);
	    if ( len ){
	        if (indefinite) {
		        val = data.substr( point, len*2 - 4);
		    } else {
		        val = data.substr( point, len*2);
		    }  
		    point += len*2;
	    }
        
	    //ret = ( isSeq ) ?  val : this.convertToRealValue( isContext ? 4 : tag , val);
    	
	    if (isSeq) {
	        var seq = this.ReadElements(val);
	        ret = "";
	        for (var i = 0; i < seq.length; i++){
	            ret += seq[i].value;
	        }
	    } else {
	        ret = this.convertToRealValue( isContext ? 4 : tag , val);
	    }	
	    return ret;
    },

    /*
    * Convert the data from hex string value into the real value
    *
    *@param{integer} tag  - the tag of the data
    *@param{hex string} data - the data in hex string to convert
    *@return{} the data in the approriate form corresponding to the tag
    */

    convertToRealValue : function(tag, data){
	    var ret = "";
    	
	    if (tag == 1){
		    ret = data ? 'TRUE' : 'FALSE';
	    }
	    else if (tag == 2){
		    //ret = (data.length < 3 ) ? parseInt("0x" + data) : data + ' : Too long Integer. Printing in HEX.';
		    ret = (data.length < 5 ) ? parseInt("0x" + data,16) : data;
	    }
	    else if (tag == 3){
		    //var unUse = parseInt("0x" + data.substr(0, 2),16);
		    
	    	
	    	var bits  = data.substr(2);
    		
		    if ( bits.length > this.Bitstring_hex_limit ){
			    ret = bits;
		    }
		    else{
			    ret = parseInt("0x" + bits,16).toString(2);
		    }
	    	
	    }
	    else if (tag == 5){
		    ret = "";
	    }
	    else if (tag == 6){
		    var res = [];
		    var d0 = parseInt("0x" + data.substr(0, 2),16);
		    res[0] = Math.floor(d0 / 40);
		    res[1] = d0 - res[0]*40;
    		
		    var stack = []; 
		    var powNum = 0;
		    var i;
		    for(i=1; i < data.length -2; i=i+2){
			    var token = parseInt("0x" + data.substr(i+1,2),16);
			    stack.push(token & 127);
    			
			    if ( token & 128 ){
				    powNum++;
			    }
			    else{
    				
				    var sum = 0;
				    for (var j=0; j<stack.length; j++){
					    sum += stack[j] * Math.pow(128, powNum--);
				    }
				    res.push( sum );
				    powNum = 0;
				    stack = [];
			    }
		    }
		    ret = res.join(".");
		    if ( this.OID[ret] ) {
			    ret += " (" + this.OID[ret] + ")";
		    }
	    }
	    else if (this.NAME[tag].match(/(Time|String)$/) ) {
		    var k = 0;
		    ret += "'";
		    while ( k < data.length ){
			    ret += String.fromCharCode("0x"+data.substr(k, 2));
			    k += 2;
		    }
		    ret += "'";
	    }
	    else{
		    ret = data;
	    }
	    return ret;
    },
    
    
     /**
    * Return the corresponding error message associated with the error code
    * @param {integer} errorCode  
    * @return {string} error message 
    */
    getErrorMessage : function(errorCode){
        var exp = SCrypto.Exception;
        switch (errorCode) {
            case exp.InvalidMessage: return "Invalid Message: not starts with the required tag or invalid length. Accepts up to 2 octets of Length field";
            default: return "Unkown error";
        }
        
    },
    
    /**
    * Return the ASN1 class
    * @return {string} SCrypto.DES class
    */
    getClass : function(){
        return "SCrypto.ASN1";
    }
};



/**
* INTEGER class
* 
* @param {integer or hex string} value - the integer value to encode. It may takes form of a hex string or an integer
*/
SCrypto.ASN1.INTEGER = function(value){
    this.value = value;
};

SCrypto.ASN1.INTEGER.prototype = {
    /**
    * Encode an inteteger value in DER encoding
    * @param {integer} intValue  
    * @return {string} hexa string of the integer value encoded.
    */
     encode : function(){   
             
        var value;
        if (typeof(this.value) == "number"){
             value = SCrypto.CryptoUtils.numberToHexString(this.value);
        } else {
            value = this.value;
        }
        
        return "02" + SCrypto.ASN1.encodeLength(value.length/2) + value;    
    }

};

/**
* OCTETSTRING class
* 
* @param {byte array or hex string} value - the octet string value to encode. It may takes form of a hex string or a byte array
*/
SCrypto.ASN1.OCTETSTRING = function(value){
    this.value = value;
};

SCrypto.ASN1.OCTETSTRING.prototype = {
    /**
    * Encode the octetstring value in DER encoding
    * @return {string} hexa string of the octet string value encoded.
    */
    encode : function(){
        var val;
        
        if (typeof(this.value) == "string"){
            val = SCrypto.CryptoUtils.stringToHex(this.value);
        } else {  // supppose it is an array
            val = SCrypto.CryptoUtils.byteArrayToHexString(this.value);
        }    
        return "04" + SCrypto.ASN1.encodeLength(val.length/2) + val;
    }
};

/**
* TAG class
* 
* @param {string} tag - the tag
* @param {boolean} implicit - true if it's implicit -false if it is explicit
* @param {string} value - the following value in hex string
*/
SCrypto.ASN1.TAG = function(tag,implicit,value){
    this.tag = tag;
    this.implicit = implicit;
    this.value = value;
};

SCrypto.ASN1.TAG.prototype = {
    /**
    * Encode the TAG value in DER encoding
    * @return {string} hexa string of the TAG value encoded.
    */
    encode : function(){
        var newtag,len,value;
        
        if (this.implicit){  // in this case the normal tag is replaced by the idicated tag
            var originTag = parseInt(this.value.substring(0,2),16);
            var isContructed = originTag & 0x20;
            
            if (isContructed) {
                newtag = 0xA0 + this.tag;
            } else {
                newtag = 0x80 + this.tag;
            }
          
            value = this.value.substring(2,this.value.length);
            
        } else { // explicit
            len = this.value.length/2;
            newtag = 0xA0 + this.tag;
            value = SCrypto.ASN1.encodeLength(len) + this.value;
        }
      
       return SCrypto.CryptoUtils.numberToHexString(newtag) + value;
        
    }
};

/**
* NULL class
* 
* @return {string} the encoding of NULL value
*/
SCrypto.ASN1.NULL = function(){
    return "0500";
};
/**
* SEQUENCE class
* 
*/
SCrypto.ASN1.SEQUENCE = function(){
    this.elements = [];
};

SCrypto.ASN1.SEQUENCE.prototype = {
    /**
    * Add an element into the sequence
    * @param {string} element - the element to add in form of hex string  
    */
     addElement : function(element){
        this.elements[this.elements.length] = element;
     },
     /**
    * Encode the sequence in DER encoding
    *
    * @return {string} hexa string of sequence value encoded.
    */
     encode : function(){
        var len = 0;
        var hex = "";
        for (var i = 0; i < this.elements.length; i++){
            hex += this.elements[i];
            len += this.elements[i].length/2;
        }
        return "30" + SCrypto.ASN1.encodeLength(len) + hex;
     }
     
};
/**
* SET class
* 
*/
SCrypto.ASN1.SET = function(){
     this.elements = [];
};

SCrypto.ASN1.SET.prototype = {
     /**
    * Add an element into the set
    * @param {string} element - the element to add in form of hex string  
    */
     addElement : function(element){
        this.elements[this.elements.length] = element;
     },
    /**
    * Encode the set in DER encoding
    *
    * @return {string} hexa string of sequence value encoded.
    */
     encode : function(){
        var len = 0;
        var hex = "";
        for (var i = 0; i < this.elements.length; i++){
            hex += this.elements[i];
            len += this.elements[i].length / 2;
        }
        return "31" + SCrypto.ASN1.encodeLength(len) + hex;
     }
};
    
/**
* OID class
* 
* @param {string} oid - the oid 
*/
// oid is an OID string "1.2.4.23.56"
SCrypto.ASN1.OID = function(oid){
    this.bits = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];
    var t = oid.split('.');
    this.oid = [];
    for (var i = 0; i < t.length; i++){
        this.oid[i] = parseInt(t[i],10);
    }
};

SCrypto.ASN1.OID.prototype = {
    /**
    * Encode the OID in DER encoding
    *
    * @return {string} hexa string of OID value encoded.
    */
    encode: function(){
        var len = this.oid.length;
        
        var first2oid = this.oid[0] * 40 + this.oid[1];
        
        var hex = this.encodeSubID(first2oid);
        
        for (var i = 2; i < len; i++){
            hex += this.encodeSubID(this.oid[i]);
        }
        
        len = hex.length/2;
        
        return "06" + SCrypto.ASN1.encodeLength(len) + hex;
       
    },
     /**
    * Encode the sub OID 
    *
    * @return {string} hexa string of sub OID value encoded.
    */
    encodeSubID: function(id){
        var bitString = "";
        
        var id_hex = SCrypto.CryptoUtils.numberToHexString(id);
        for (var i=0; i < id_hex.length; i++){
             var t = parseInt(id_hex.charAt(i),16);
             bitString += this.bits[t];   
        }
        // strim the 0
        while (bitString.length > 1) {
            if (bitString.substring(0,1) == "0"){
                bitString = bitString.substring(1,bitString.length);
            } else {
                break;
            }
        } 
        
        var sevenbitsArray = [];
        
        var len = bitString.length;
        var loops = (len - (len %7)) / 7 + 1;
        
        index = len-7;

        for (i = loops-1; i >= 0; i--){
            if (index > 0) {
                sevenbitsArray[i] = bitString.substr(index, 7);
                index -= 7;
            } else {
                sevenbitsArray[i] = bitString.substr(0,bitString.length - ((loops-1) * 7));
            }    
        }
        
        len = sevenbitsArray.length;
        var byteArray = [];
        
        for ( i = 0; i < len-1; i++){
            byteArray[i] = 128 + this.convertBitArray(sevenbitsArray[i]);
        }
        byteArray[len-1] = this.convertBitArray(sevenbitsArray[len-1]);
         
        return SCrypto.CryptoUtils.byteArrayToHexString(byteArray);
    },
     /**
    * Convert a bit array into an integer
    *
    * @param {string} bits - bit array in form of a string "101110..."
    * @return { integer} - the value of the bit array
    */
    convertBitArray : function(bits){
        var j = 1, r = 0;
        
        for (var i = bits.length-1; i>=0; i--){
            var t = parseInt(bits.charAt(i),2);
            r += t * j; // t* 2^j
            j = j* 2;
        }
        return r;
    }
};
/**
* UTCTime class
*
* @param {string} time - the time in string form
* 
*/    
SCrypto.ASN1.UTCTime = function(time){
    this.time = time;
};

SCrypto.ASN1.UTCTime.prototype = {
     /**
    * Encode the UTCTime
    *
    * @return {string} hexa string of UTCTime value encoded.
    */
    encode : function(){
        var timeString = SCrypto.CryptoUtils.stringToHex(this.time);
        return "17" + SCrypto.ASN1.encodeLength(timeString.length/2) + timeString;
    }
};
    
/**
* Encode the length
*
* @param {integer} length - the length to encode
* @return{string} - the length encoded in hex string 
* 
*/   
SCrypto.ASN1.encodeLength = function(length){
    var hex = SCrypto.CryptoUtils.numberToHexString(length);
   
    var numberOfBytes = hex.length/2;
    
    if (length < 127) { // short form
        return hex;
    }
    // long form
    var firstByte = 0x80 + numberOfBytes;
    
    return SCrypto.CryptoUtils.numberToHexString(firstByte) + hex;
};

/**
 * This is the PKCS related specification and X509 certficate definition  classes.
 * That includes PKCS#1, PKCS#5, PKCS#7, PKCS#8 and PKCS#12
 * Depends on CryptoUtils.js, MD2.js, MD5.js, SHA1.js, DES.js, RC2.js, RC4.js, Compression.js
 */


if(typeof(SCrypto) == 'undefined'){
         SCrypto = { };
}



/**
 * The PKCS exception error returning  and generic object
 */
if(typeof(SCrypto.PKCS) == 'undefined'){
         SCrypto.PKCS = { };
}

SCrypto.PKCS.getErrorMessage = function(code){
        var exp = SCrypto.Exception;
        switch (code) {
            case exp.InvalidKey : return "Invalid Key Length";
            case exp.TypeNotSupported: return "Content Type or Oid Not Supported Yet";
            case exp.AlgoNotSupported: return "Algo not Supported Yet";
            case exp.HashAlgoNotSupported: return "Hash Algo not Supported Yet";
            default: return "Unknown";
        }
};

SCrypto.PKCS.getClass = function(){
        return "SCrypto.PKCS";
};

/**
 * The global ASN1 parser
 */
SCrypto.PKCS.asn1 = new SCrypto.ASN1();



if(typeof(SCrypto.PKCS1) == 'undefined'){
         SCrypto.PKCS1 = { };
}

/**
* Convert the OID to the algo name
*/
SCrypto.PKCS1.oidConvert = function(oid){
        switch (oid) {
            case "1.2.840.113549.1.1.1": return "RSA encryption ";
            case "1.2.840.113549.1.1.2": return "MD2 with RSA encryption";
            case "1.2.840.113549.1.1.3": return "MD4 with RSA encryption";
            case "1.2.840.113549.1.1.4": return "MD5 with RSA encryption";
            case "1.2.840.113549.1.1.5": return "SHA-1 with RSA Encryption ";
            case "1.2.840.113549.1.1.6": return "rsaOAEPEncryption";
            default: return oid;
        }
  };



 /**
    * Just remove an extra 0 before some RSA key component
    * @param {string} str - the string to remove extra 0 at the begining
    */
SCrypto.PKCS1.RemoveExtra0 = function(str){
        if (typeof(str) == "string"){
            if (str.substring(0,2) == "00") {
                return str.substring(2,str.length);
            } else {
                return str;
            }
        } else {// it should be a number
            // sometimes the function toHexStr also add extra 00 at the beginning
            return SCrypto.PKCS1.RemoveExtra0(SCrypto.CryptoUtils.numberToHexString(str));
        }
};


/**
 * The class to parse a PKCS1 RSAPublicKey  structure
 * @param {string} data - the PKCS1 RSAPublicKey  - in ASN1 format
 */
SCrypto.PKCS1.RSAPublicKey = function (data){
   var tmp = SCrypto.PKCS.asn1.ReadSEQUENCE(data);
   var hexToBA = SCrypto.CryptoUtils.hexStringToByteArray;

   this.modulus = hexToBA(SCrypto.PKCS1.RemoveExtra0(tmp[0].value));
   this.publicExponent = hexToBA(SCrypto.PKCS1.RemoveExtra0(tmp[1].value));
};

/**
 * The class to parse a PKCS1 RSAPrivateKey  structure
 * @param {string} data - the PKCS1 RSAPrivateKey  - in ASN1 format
 */
SCrypto.PKCS1.RSAPrivateKey = function(data){
    this.privateKeySize = 0;
    this.privateKeyValue = null;
    this.modulus  = null;
    var hexToBA = SCrypto.CryptoUtils.hexStringToByteArray;
    var remove0 = SCrypto.PKCS1.RemoveExtra0;

    var tmp = SCrypto.PKCS.asn1.ReadSEQUENCE(data);
    this.modulus = hexToBA(remove0(tmp[1].value));
    var e =  hexToBA(remove0(tmp[2].value));
    var d =  hexToBA(remove0(tmp[3].value));
    var p =  hexToBA(remove0(tmp[4].value));
    var q =  hexToBA(remove0(tmp[5].value));
    var exp1 = hexToBA(remove0(tmp[6].value));
    var exp2 = hexToBA(remove0(tmp[7].value));
    var coeff = hexToBA(remove0(tmp[8].value));
    this.formPrivateKey(this.modulus,d,e,p,q,exp1,exp2,coeff);
};

SCrypto.PKCS1.RSAPrivateKey.prototype = {

     /**
      * Form the privatekey value that used in the card from other RSA private key components
      * @param {Array} modulus - the modulus
      * @param {Array} d
      * @param {Array} e
      * @param {Array} p
      * @param {Array} q
      * @param {Array} exp1
      * @param {Array} exp2
      * @param {Array} coeff
      */
     formPrivateKey : function(modulus,d,e,p,q,exp1,exp2,coeff){

        var keySize = modulus.length*8;
        var keyValue = [];
        var i,plen2 = modulus.length/2;

        var index = 0;

        //p
        if (p.length < plen2){
             //-- apppend 0 before to have a length of plen2
            for (i = 0; i < plen2 - p.length; i++){
                keyValue[index++] = 0;
            }
        }
        for (i = 0; i < p.length; i++){
            keyValue[index++] = p[i];
        }

        //q
        if (q.length < plen2){
             //-- apppend 0 before to have a length of plen2
            for (i = 0; i < plen2 - q.length; i++){
                keyValue[index++] = 0;
            }
        }
        for (i = 0; i < q.length; i++){
            keyValue[index++] = q[i];
        }
        if (coeff.length < plen2){
             //-- apppend 0 before to have a length of plen2
            for (i = 0; i < plen2 - coeff.length; i++){
                keyValue[index++] = 0;
            }
        }
        //inverseQ - coeff
        for (i=0; i< coeff.length; i++){
            keyValue[index++] = coeff[i];
        }
        // DP
        if (exp1.length < plen2){
             //-- apppend 0 before to have a length of plen2
            for (i = 0; i < plen2 - exp1.length; i++){
                keyValue[index++] = 0;
            }
        }
        for (i= 0; i< exp1.length; i++){
             keyValue[index++] = exp1[i];
        }
        //DQ
        if (exp2.length < plen2){
             //-- apppend 0 before to have a length of plen2
            for (i = 0; i < plen2 - exp2.length; i++){
                keyValue[index++] = 0;
            }
        }
        for (i= 0; i< exp2.length; i++){
             keyValue[index++] = exp2[i];
        }
        //d
        if (d.length < modulus.length){
             //-- apppend 0 before to have a length of plen2
            for (i = 0; i < modulus.length - d.length; i++){
                keyValue[index++] = 0;
            }
        }
        for (i= 0; i< d.length; i++){
             keyValue[index++] = d[i];
        }

        // modulus
         for (i= 0; i< modulus.length; i++){
             keyValue[index++] = modulus[i];
        }

        // e -- apppend 0 before to have a length of 4
        for (i = 0; i < 4 - e.length; i++){
            keyValue[index++] = 0;
        }

        for (i= 0; i< e.length; i++){
             keyValue[index++] = e[i];
        }

        this.privateKeySize = keySize;
        this.privateKeyValue = keyValue;

     }
};




if(typeof(SCrypto.PKCS5) == 'undefined'){
         SCrypto.PKCS5 = { };
}


/**
 * The class containing the PKCS5  PBKDF1 Key Derivation function
 * @param {Object} digest - the digest function (MD2 - MD5 or SHA1)
 */
SCrypto.PKCS5.KeyDerivePBKDF1 = function(digest) {
    this.digest  = digest;
    this._password = null;
    this._salt = null;
    this._iterations = 0;
    this.already_iteration = 0;
    this._hashName = "";
    this.keyLength = 0;
    this.HashInput = "";
    this.nextFunction = null;
    this.dKey = null;
};

SCrypto.PKCS5.KeyDerivePBKDF1.prototype = {
    /**
   * Set the next function to execute after the derive finished
   * @param {Object} nextFunc - function to execute next
   */
    setNextFunction : function(nextFunc){
        this.nextFunction = nextFunc;
    },
    /**
   * set the password which is used by the derive process
   * @param {Array} value - the password
   */
    setPassword : function(password){
        this._password = password;
    },
   /**
   * Prepare data for the derive process
   *
   */
   DeriveKey : function(size){
       var exception = SCrypto.Exception;

       if (((this._hashName == "MD2") || (this._hashName == "MD5")) && (size > 16)) {
           throw new exception(SCrypto.PKCS,exception.InvalidKey);
       }

       if ((this._hashName == "SHA1")  && (size > 20)) {
             throw new exception(SCrypto.PKCS,exception.InvalidKey);
       }

       this.keyLength = size;

       switch (this._hashName) {
            case "SHA1" : this.digest = new SCrypto.SHA1();
                          break;
            case "MD5" : this.digest = new SCrypto.MD5();
                          break;
            case "MD2" : this.digest = new SCrypto.MD2();
                          break;
            default : throw new exception(SCrypto.PKCS,exception.HashAlgoNotSupported);
       }


       var str = this._password;

       for (var i = 0; i < this._salt.length; i++){
          str += String.fromCharCode(this._salt[i]);
       }
        this.HashInput = str;
        this.already_iteration = 0;
        this.CumputeHash();
   },
   /**
   * Compute the Hash - devide by 1000 times
   *
   */
   CumputeHash : function(){
        var n;

      if (this.already_iteration < this._iterations){
           if ((this._iterations - this.already_iteration) > 1000){
              n = 1000;
           } else {
              n = this._iterations - this.already_iteration;
           }
           this.already_iteration += n;

      }
      for (var j = 0; j < n; j++) {
         this.HashInput = this.digest.Hash( this.HashInput);
      }

        var nextStep;

      if (this.already_iteration < this._iterations) {
          nextStep = SCrypto.CryptoUtils.createClosure(this,this.CumputeHash);
          setTimeout(nextStep,20);
      } else {
         // finish the hash - now store the derived key and start the next step
         this.dKey = [];
           for (j = 0; j < this.keyLength; j++){
            this.dKey[j] = this.HashInput.charCodeAt(j);
         }
         this.nextFunction();
      }
   }
};




if(typeof(SCrypto.PKCS7) == 'undefined'){
         SCrypto.PKCS7 = { };
}

/**
 * The class containing the ASN1 OID used in PKCS7  standard
 */
SCrypto.PKCS7.Oid = function() {};

SCrypto.PKCS7.Oid.data = "1.2.840.113549.1.7.1";
SCrypto.PKCS7.Oid.signedData = "1.2.840.113549.1.7.2";
SCrypto.PKCS7.Oid.envelopedData = "1.2.840.113549.1.7.3";
SCrypto.PKCS7.Oid.signedAndEnvelopedData = "1.2.840.113549.1.7.4";
SCrypto.PKCS7.Oid.digestedData = "1.2.840.113549.1.7.5";
SCrypto.PKCS7.Oid.encryptedData = "1.2.840.113549.1.7.6";

/**
 * The class to parse a PKCS7 ContentInfo structure
 * @param {string} data - the PKCS7 ContentInfo - in ASN1 format
 */
SCrypto.PKCS7.ContentInfo = function(data){
   var asn1 = SCrypto.PKCS.asn1;
   this.contentType ="";
   this.content ="";

   var CI_Sequence = asn1.ReadSEQUENCE(data);
   this.contentType = CI_Sequence[0].value;

   switch (this.contentType) {
       case SCrypto.PKCS7.Oid.data:           this.content = asn1.readValue(CI_Sequence[1].value,'OCTETSTRING');
                                      break;
       case SCrypto.PKCS7.Oid.encryptedData:  this.content = CI_Sequence[1].value;
                                      break;
       case SCrypto.PKCS7.Oid.signedData:     this.content = asn1.ReadSEQUENCE(CI_Sequence[1].value);
                                      break;
       default:                       throw new SCrypto.Exception(SCrypto.PKCS,SCrypto.Exception.TypeNotSupported);
   }
};

/**
 * The class to parse an encrypted PKCS7 EncryptedData structure
 * @param {string} data - the PKCS7 EncryptedData - in ASN1 format
 */
SCrypto.PKCS7.EncryptedData = function(data){
    var asn1 = SCrypto.PKCS.asn1;

    var encryptedData = asn1.ReadSEQUENCE(data);
    var encryptedContentInfo = asn1.ReadSEQUENCE(encryptedData[1].DER_Encoded);
    var contentEncryptionAlgo = asn1.ReadSEQUENCE(encryptedContentInfo[1].DER_Encoded);
    this.encryptionAlgorithm = contentEncryptionAlgo[0].value;
    var algoParams = asn1.ReadSEQUENCE(contentEncryptionAlgo[1].DER_Encoded);
    this.salt = algoParams[0].value;
    this.iterationCount = algoParams[1].value;
    // check for the OCTET STRING
    this.encryptedData = asn1.readValue(encryptedContentInfo[2].DER_Encoded,"[0]");
};
/**
 * This function encodes a chain certificates into the PKCS7 empty signed data format to put the chain certificate into the card in the msroots file
 * @param {string} chainCert - concatenation of the chain certificate
 */
SCrypto.PKCS7.EncodeChainCertificateInSignedData = function(chainCert){
    var toHexStr = SCrypto.CryptoUtils.numberToHexString;

    var version = "020101"; // 01
    var digest_algo = "3100"; // empty SET
    var emptyContentInfo = "300B06092A864886F70D010701";
    var length = chainCert.length /2 ; // length in byte
    var certificates = "A082" + toHexStr(length).substring(4) + chainCert;
    var emptySignerInfo = "3100"; // empty SET

    var signedData_content = version + digest_algo + emptyContentInfo + certificates + emptySignerInfo;
    length = signedData_content.length / 2;
    var signedData = "3082" + toHexStr(length).substring(4) + signedData_content;
    length = signedData.length /2;
    var signedData_0 = "A082" + toHexStr(length).substring(4) + signedData;
    var signedDataOID = "06092A864886F70D010702";
    length = (signedDataOID.length + signedData_0.length)/2;
    var contentInfo = "3082" + toHexStr(length).substring(4) + signedDataOID + signedData_0;
    return contentInfo;
};
/**
 * This function parse the PKCS7 empty signed data to extract the chain certificate
 * @param {hex string} data - the PKCS7 signed data
 */
SCrypto.PKCS7.SignedData = function(data){

    this.certificates = [];
    this.certificateList = [];
    if (data === null) {
        return;
    }
    var signedData = new SCrypto.PKCS7.ContentInfo(data);
    this.certificateList = SCrypto.PKCS.asn1.ReadArrayOfSEQUENCE(signedData.content[3].value);
    for (var i = 0 ; i < this.certificateList.length; i++){
        this.certificates[i] = new SCrypto.X509Certificate( this.certificateList[i]);
    }
};
SCrypto.PKCS7.SignedData.prototype = {
    /**
    * Remove a specific certificate from the array of root certs
    * @param {integer} index - the index of certificate to be removed
    */
    removeRootCert: function(index){
        var tmp = [];
        var j = 0;
        for (var i=0; i < this.certificates.length; i++){
           if (i != index){
              tmp[j++] = this.certificates[i];
           }
        }
        this.certificates = tmp;
    }
};



if(typeof(SCrypto.PKCS8) == 'undefined'){
         SCrypto.PKCS8 = { };
}

/**
 * The class to parse an encrypted PKCS8 PrivateKeyInfo structure
 * @param {string} data - the EncryptedPrivateKey data - still in ASN1 format
 */
SCrypto.PKCS8.EncryptedPrivateKeyInfo = function(data){
    var asn1 = SCrypto.PKCS.asn1;

    var tmp = asn1.ReadSEQUENCE(data);
    var algoId = asn1.ReadSEQUENCE(tmp[0].DER_Encoded);

    this.encryptionAlgorithm = algoId[0].value;

    var algoParams =  asn1.ReadSEQUENCE(algoId[1].DER_Encoded);

    this.salt = algoParams[0].value;
    this.iterationCount = algoParams[1].value;

    this.encryptedData = tmp[1].value;

};

/**
 * The function to parse a PKCS8 PrivateKeyInfo structure
 * @param {string} data - the PrivateKey data - still in ASN1 format
 * return (Object) - the corresponding private key in its format - RSA or DSA - at the moment we support only RSA
 */
SCrypto.PKCS8.PrivateKeyInfo = function(data){
    var asn1 = SCrypto.PKCS.asn1;

    var tmp = asn1.ReadSEQUENCE(data);
    //var version = tmp[0].value;
    var privateKeyAlgorithm = asn1.ReadSEQUENCE(tmp[1].DER_Encoded);
    var privateKey = tmp[2].value;
    switch (privateKeyAlgorithm[0].value){
        case "1.2.840.113549.1.1.1": //rsaEncryption:
            return new SCrypto.PKCS1.RSAPrivateKey(privateKey);
    }
    return null;
};




if(typeof(SCrypto.X500) == 'undefined'){
         SCrypto.X500 = { };
}

/**
 * The class to parse the X.500 Name
 * @param {string} name - the ASN1 encoded name
 * return (string) - readable string name
 */
SCrypto.X500.ParseName  = function(name){
 var asn1 = SCrypto.PKCS.asn1;
 var str = "";
 var attributes =   asn1.ReadSEQUENCE(name);

 for (var i = 0; i < attributes.length; i++){
    var attribute = asn1.ReadSEQUENCE(attributes[i].value);
    var value = attribute[1].value.substr(1,attribute[1].value.length-2);
    switch (attribute[0].value){
      case "2.5.4.10": str += "O="+value + ","; //organizationName
           break;
      case "2.5.4.11": str += "OU="+value +"," ; //organizationalUnitName
           break;
      case "2.5.4.3": str += "CN="+value +"," ;  //commonName
           break;
           // email address
      case "1.2.840.113549.1.9.1": str += "E="+value+"," ;
           break;
    }
 }
 // remove the last ',' character
 str = str.substr(0,str.length-1);
 return str;
};



/**
 * The class to parse a X509 certificate - in fact it only extract the cert. option to know the usage of the key
 * @param {string} certContent - the cert data - still in ASN1 format
 */
SCrypto.X509Certificate = function(certContent){
     var asn1 = SCrypto.PKCS.asn1;
     this.keyType = "KEY_EXCHANGE";

     this.cert = certContent;

     // preparing to put the certificate into the card
     // first parse the certificate to get some information such as cert usage option
     var tmp = asn1.ReadSEQUENCE(this.cert);


     var tbsCert = asn1.ReadSEQUENCE(tmp[0].DER_Encoded);
     var index = 0;

     if (tbsCert[0].tag == "[0]"){
        this.version = tbsCert[0].value;
        index ++;
     } else {
         this.version = 1;
     }

     this.serialNumber = tbsCert[index++].value;
     var algoOID = asn1.readValue(tbsCert[index++].value,'OBJECTIDENTIFIER');
     this.keyAlgorithm = SCrypto.PKCS1.oidConvert(algoOID);

     this.issuerDEREncoded = tbsCert[index++].DER_Encoded;
     this.issuer = SCrypto.X500.ParseName(this.issuerDEREncoded);
     var validity = asn1.ReadSEQUENCE(tbsCert[index++].DER_Encoded);
     this.effectiveDate = this.convertDate(validity[0].value);
     this.expirationDate = this.convertDate(validity[1].value);
     this.subject = SCrypto.X500.ParseName(tbsCert[index++].DER_Encoded);


     var publicKeyInfo = asn1.ReadSEQUENCE(tbsCert[index++].DER_Encoded);
     this.publicKeyDER_Encoded = publicKeyInfo[1].value;
     var rsaPublicKey = new SCrypto.PKCS1.RSAPublicKey(this.publicKeyDER_Encoded);

     this.modulus = rsaPublicKey.modulus;
     this.publicExponent = rsaPublicKey.publicExponent;


     //compute the SHA1 thumprint of the certificate
     var sha1 = new SCrypto.SHA1();
     var hash = sha1.Hash(certContent);
     tmp = [];
          for (var j=0; j< hash.length; j++){
                tmp[j] = hash.charCodeAt(j);
          }

     this.thumbprint =  SCrypto.CryptoUtils.byteArrayToHexString(tmp).toUpperCase();

     var certExtension;

     if (tbsCert[tbsCert.length - 1].tag =="[3]"){   // meaning there are some options
            certExtension = tbsCert[tbsCert.length - 1].value;
            var ext = asn1.ReadSEQUENCE(certExtension);
            for (var i = 0; i < ext.length; i++){
                var ext_i = asn1.ReadSEQUENCE(ext[i].DER_Encoded);
                if (ext_i[0].value == "2.5.29.15"){ //Key Usage Extension
                    // todo
                }

                if (ext_i[0].value == "2.5.29.37"){  // Extended Key Usage Extension
                    // we consider that if all the Extended Key Usages requires the key type to be "KEY_EXCHANGE"
                    this.keyType = "KEY_EXCHANGE";
                }
            }
       }

};

SCrypto.X509Certificate.prototype = {
        convertDate : function(UTCString){
            UTCString = UTCString.substr(1,UTCString.length-2);
            var year = UTCString.substr(0,2);
            var month = UTCString.substr(2,2);
            var date = UTCString.substr(4,2);
            var hour = UTCString.substr(6,2);
            var minute = UTCString.substr(8,2);
            var second = UTCString.substr(10,2);
            return month + "/"+date+"/20"+year+" "+hour+":"+minute+":"+second;
        }
};



if(typeof(SCrypto.PKCS12) == 'undefined'){
         SCrypto.PKCS12 = { };
}


SCrypto.PKCS12.KeyPair = function(privateKeyValue,privateKeySize,modulus){
    this.privateKeyValue = privateKeyValue;
    this.privateKeySize = privateKeySize;
    this.modulus   = modulus;
    this.certificate = "";
    this.compressedCertificate = "";
    this.keyType = null;
};

SCrypto.PKCS12.KeyPair.prototype = {
    checkCertificate : function(certObject){
            var ok = true;
            for (var j = 0; j < certObject.modulus.length; j++){
                  if (this.modulus[j] != certObject.modulus[j]){
                      ok = false;
                      break;
                  }
              }
              if (ok){
                    this.certificate = certObject.cert;
                    this.keyType  = certObject.keyType;
                    return true;
              } else{
                    return false;
              }
    },
    setCompressedCert : function(compressedCert){
        this.compressedCertificate = compressedCert;
    }
};
/**
 * The main class of the PKCS12 PFX Parser
 * @param {string} password - the password value that is used to protect the p12 file
 * @param {Object} errorHandler - the handler where to receive the error and the success message
 */
SCrypto.PKCS12.PFX = function(password,errorHandler,progressBarHandler){

    this.authenticateSafe = "";
    this.macDerive = null;
    this.rootCertificate = [];
    this.rootCertLength = 0;
    this.keyType = 0;
    this.certificates = [];
    this.keyPair = [];
    this.progressBar = 0;
    this.stoprunning = false;
    this._password = password;
    this.errorHandler = errorHandler;
    this.progressBarHandler = progressBarHandler;
    this.numberOfSafebagToRead = 0;
    this.numberOfSafebagAreadyRead = 0;
    this.alreadyProcessCertificate = false;
    this.keyIndex = 0;
    this.mscm = null;
    this.transaction  = 0;
    this.cardErrorHandler = null;

};

SCrypto.PKCS12.PFX.prototype = {
  utils : SCrypto.CryptoUtils,

 /**
 * Decode the P12 content
 * This method parse the P12 file data and then put the private key/cert into the card. The error message will be notified through the errorHandler provided earlier
 * @param {string} data - the hex string of the P12 file content
 */
 Decode : function(data){
    var asn1 = SCrypto.PKCS.asn1;
    try{

        var pfx = asn1.ReadSEQUENCE(data);

        // Read version
        version = pfx[0].value;
        this.progressBar = 1;
        this.progressBarHandler(this.progressBar);

        var authSafe = pfx[1];

        authSafe = new SCrypto.PKCS7.ContentInfo(authSafe.DER_Encoded);

        if ((authSafe.contentType != SCrypto.PKCS7.Oid.data) &&  (authSafe.contentType != SCrypto.PKCS7.Oid.signedData)){
            this.errorHandler(1,"Error during parsing the P12 certificate: Invalid authenticated safe");
            return;
      }

             // Read AuthenticateSafe structure
        this.authenticateSafe =    asn1.ReadSEQUENCE(authSafe.content);

        // Read the MAC
        if (pfx.length>2){
          var macData =  asn1.ReadSEQUENCE(pfx[2].DER_Encoded);
          var digestInfo = asn1.ReadSEQUENCE(macData[0].DER_Encoded);
          var algoEncoded =  asn1.ReadSEQUENCE(digestInfo[0].DER_Encoded);
          var macAlgoId = algoEncoded[0].value;

          if (macAlgoId != "1.3.14.3.2.26"){ // SHA1
               this.errorHandler(1,"Error during parsing the P12 certificate: MAC algorithm OID " + macAlgoId+ " not supported");
               return;

          }

          var macValue = digestInfo[1].value;

          var macSalt = macData[1].value;

          var macIterationCount;

          if (macData.length > 2) {
              macIterationCount = macData[2].value;
          } else { // use default value
                macIterationCount = 1;
          }

          this.macDerive = new SCrypto.PKCS12.DeriveBytes();
        this.macDerive.setPassword(this._password);
        this.macDerive._salt = this.utils.hexStringToByteArray(macSalt);
        this.macDerive._iterations = macIterationCount;
        this.macDerive._hashName = "SHA1";

        var argsForStep = {
                      mac : macValue,
                      macData: authSafe.content
          };
        var nextStepFunc = this.utils.createClosure(this,this.VerifyMac,argsForStep);

        this.macDerive.setNextFunction(nextStepFunc);

          this.macDerive.DeriveMAC(20);
        } else {
            // in case there is no MAC
            this.ParseAuthenticateSafe();
        }
      }catch (e){
          this.errorHandler(1,"Error during parsing the P12 certificate: Invalid pfx or p12 file format (" + e + ")");
      }
  },


  /**
 * Verify the MAC of the P12 file content
 * This method verifies the MAC of the P12 file content and then executes the parse authenticate safe structure in the file
 * @param {Object} args - contains the mac value and the macData
 */
   VerifyMac : function(args){
        if ( this.stoprunning ) {
                return;
        }

       var macValue = args.mac;
       var macData = args.macData;
       var hmacKey = this.macDerive.dKey;

       this.progressBar = 15;
       this.progressBarHandler(this.progressBar);

        var calculatedMac = SCrypto.HMAC_SHA1(hmacKey,this.utils.hexStringToByteArray(macData));

        calculatedMac = this.utils.byteArrayToHexString(calculatedMac);

        if (macValue.toUpperCase() != calculatedMac.toUpperCase()){
            this.errorHandler(1,"Invalid MAC - the p12 file is corrupt or the password entered is incorrect");
            return;
        }
        // now call the parser of the p12 content

       var nextStepFunc = this.utils.createClosure(this,this.ParseAuthenticateSafe);
       window.setTimeout(nextStepFunc,20);

    },

   /**
   * Parse the AuthenticateSafe structure of the P12 file
   *
   */
    ParseAuthenticateSafe : function(){
        var asn1 = SCrypto.PKCS.asn1;
        var pkcs7 = SCrypto.PKCS7;

        for (index = 0; index < this.authenticateSafe.length; index ++){
            if (this.stoprunning) {
        return;
      }

            this.proressBar_n = (100 -  this.progressBar)/this.authenticateSafe.length;

            var ci = new pkcs7.ContentInfo(this.authenticateSafe[index].DER_Encoded);
            switch (ci.contentType) {
                case pkcs7.Oid.data:
                // unencrypted (by PKCS#12)

              var safeContent = asn1.ReadSEQUENCE(ci.content);
              this.proressBar_n = this.proressBar_n/safeContent.length;
              try{
                  for (var j = 0; j < safeContent.length; j++){
                    safeBag = asn1.ReadSEQUENCE(safeContent[j].DER_Encoded);
                    this.ReadSafeBag(safeBag);
                  }
              }catch (e){
                 this.errorHandler(1,"Error while parsing the safebag ("+e+")");
                   this.stoprunning = true;
              }
              break;
          case pkcs7.Oid.encryptedData:
                // password encrypted
                var encryptedSafeContent = new pkcs7.EncryptedData(ci.content);
                var nextStepFunc = this.utils.createClosure(this,this.ProcessUnencryptedReadSafeBag);
                this.Decrypt (encryptedSafeContent.encryptionAlgorithm, encryptedSafeContent.salt, encryptedSafeContent.iterationCount, encryptedSafeContent.encryptedData,nextStepFunc);

            break;
            case pkcs7.Oid.envelopedData:
                // public key encrypted
                 this.errorHandler(1,"Error during parsing the P12 certificate: Public key encrypted not implemented yet");
                 this.stoprunning = true;
                 return;
          default:
                       this.errorHandler(1,"Error during parsing the P12 certificate: Unknown authenticatedSafe");
                       this.stoprunning = true;
                       return;
            }
           }

   },

  /**
 * Parse the SafeBags structure of the P12 file
 * @param {Object} safeBag - contains the safebag type and safebag value
 */
  ReadSafeBag  : function(safeBag){
       if ( this.stoprunning ) {
            return;
       }
      var asn1 = SCrypto.PKCS.asn1;
      var exp = new SCrypto.Exception(SCrypto.PKCS,SCrypto.Exception.TypeNotSupported);
      this.numberOfSafebagToRead++;

      var safeBagType = safeBag[0].value;
      var bagValue = safeBag [1].value;

        switch (safeBagType) {
        case "1.2.840.113549.1.12.10.1.1": //keyBag:

          var args = {
              error : 0,
              message : bagValue
          };

          this.ReadPKCS8PrivateKey([args]);

          break;
        case "1.2.840.113549.1.12.10.1.2": //pkcs8ShroudedKeyBag
          var epki = new SCrypto.PKCS8.EncryptedPrivateKeyInfo (bagValue);
          var nextStepFunc = this.utils.createClosure(this,this.ReadPKCS8PrivateKey);
            this.Decrypt (epki.encryptionAlgorithm, epki.salt, epki.iterationCount, epki.encryptedData,nextStepFunc);

          break;
        case "1.2.840.113549.1.12.10.1.3": //certBag

          var cert = asn1.ReadSEQUENCE(bagValue);
          if (cert[0].value != "1.2.840.113549.1.9.22.1"){  //x509Certificate

             throw exp;
          }
          var certContent = asn1.readValue(cert[1].value,'OCTETSTRING');

          var x509 = new SCrypto.X509Certificate(certContent);
          this.certificates[this.certificates.length] = x509;
          // added 11/29/07
          this.numberOfSafebagAreadyRead ++;

          break;
        case "1.2.840.113549.1.12.10.1.4": //crlBag
            // TODO
            throw exp;

        case "1.2.840.113549.1.12.10.1.5": //secretBag:
            // TODO
             throw exp;

        case "1.2.840.113549.1.12.10.1.6" : //safeContentsBag:
             throw exp;
          // TODO - ? recurse ?
        default:
           throw exp;
      }

   },

  /**
 * Parse (Read) the PKCS8 Private Key format - then store (or put it into the card)
 * @param {Object} args - contains the private key in clear value in the PKCS8 format
 */
   ReadPKCS8PrivateKey : function(args){
       if ( this.stoprunning ) {
                return;
       }
       this.numberOfSafebagAreadyRead ++;
       var data;
       var error = args[0].error;
        if (error === 0){
            data =  args[0].message;
        } else {
            this.errorHandler(1,"Error when parsing the P12 certificate: " + args[0].message);
            this.stoprunning = true;
            return;
        }
       var privateKey;

       try{
          privateKey = SCrypto.PKCS8.PrivateKeyInfo (data);
       } catch (e){
            this.errorHandler(1,"Error when parsing the P12 certificate: Private Key (" + e + ")");
            this.stoprunning = true;
            return;
       }
       if (privateKey !== null){
            var len = this.keyPair.length;
            this.keyPair[len] = new SCrypto.PKCS12.KeyPair(privateKey.privateKeyValue,privateKey.privateKeySize,privateKey.modulus);
            this.notify();
        } else {
            // private key format not supported
            this.errorHandler(1,"Private key format not supported.");
            this.stoprunning = true;
        }

  },

  /**
 * Process the SafeBags after decrypt them
 * @param {Object} args - contains the safebags
 */
  ProcessUnencryptedReadSafeBag : function(args){
        if ( this.stoprunning ) {
         return;
        }
        var asn1 = SCrypto.PKCS.asn1;
        var data;
        var error = args[0].error;
        if (error === 0){
            data =  args[0].message;
        } else {
            this.errorHandler(1,"Error when parsing the P12 certificate: " + args[0].message);
            this.stoprunning = true;
            return;
        }
        try{

            var safeContent = asn1.ReadSEQUENCE(data);
            for (var j = 0; j < safeContent.length; j++){
              var safeBag = asn1.ReadSEQUENCE(safeContent[j].DER_Encoded);
              this.ReadSafeBag(safeBag);
            }
        } catch (e){
            this.errorHandler(1,"Error when parsing the P12 certificate: SafeBag - ");
            this.stoprunning = true;
        }
        this.notify();
  },

  /**
 * Decrypt the data that was encrypted by the password
 * @param {string} algorithmOid - the algorithm Oid
 * @param {string} salt - the salt
 * @param {int} iterationCount - the iteration count
 * @param {string} encryptedData - the encrypted data to decrypt
 * @param {Object} nextStepFn - the function to be executed after the data is decrypted. Usually this function will process the data after it is decrypted
 */
  Decrypt : function(algorithmOid, salt,iterationCount,encryptedData,nextStepFn) {
            if ( this.stoprunning ) {
                return;
            }
      salt = this.utils.hexStringToByteArray(salt);
      var sa = new SCrypto.PKCS12.DecryptData (this._password,algorithmOid, salt, iterationCount,encryptedData,nextStepFn,this.proressBar_n,this.progressBarHandler);
        // derive the key from the password and then decrypt the data
      sa.DeriveKey();
  },

 /**
 * This function may process the root certificate and compress them (root & user certs) before putting them into the card
 */
  processCertificates : function(){

     if ( this.stoprunning ) {
         return;
     }

     var cert_total = this.certificates.length;

       // search for user certificate
      for (var i = 0; i < cert_total; i++){
              var found = false;
              for (var j = 0; j < this.keyPair.length; j++){
                  if (this.keyPair[j].checkCertificate(this.certificates[i])){
                      found = true;
                      break;
                  }
              }
              if (!found){
                 this.rootCertificate[this.rootCertificate.length] = this.certificates[i].cert.toUpperCase();
              }
        }


     var deflater = new SCrypto.Compression.Deflater(SCrypto.Compression.DEFAULT_COMPRESSION,"zlib"); // use ZLIB algo

     for (i = 0; i < this.keyPair.length; i++){
        deflater.setInput(this.utils.hexStringToByteArray(this.keyPair[i].certificate));
        var compressed = [];
        deflater.deflate(compressed);
        deflater.reset();
        this.keyPair[i].setCompressedCert(compressed);
     }

     this.alreadyProcessCertificate = true;
     this.notify();

  },


   /**
 * This function notifies the errorHandler (the caller) when the key and cert in the p12 file are sucessfully parsed and ready
 * to put in the card
 */
  notify  : function(){
        if ( this.stoprunning ) {
                return;
        }
        // in case there is no cert yet - just return
        if (this.certificates.length === 0) {
            return;
        }
        if (this.numberOfSafebagAreadyRead == this.numberOfSafebagToRead){
            if (this.alreadyProcessCertificate === false){
                this.processCertificates();
                return;
            }
        } else {
            return;
        }

        this.errorHandler(0,"P12 key and certificate are ready to be imported into the card");
        this.stoprunning = true;
   },
   /**
  * Cancel the p12 parsing
  */
   Cancel : function(){
     this.stoprunning = true;
   }
};


 /**
 * Decrypt the data that was encrypted by the password
 * This class check the algo id to get the right algo to decrypt the data
 * It will call the deriveBytes class to derive the password to get the key and iv to decrypt the data
 * @param {Array} password - the password in form of BMI array
 * @param {string} algorithmOid - the algorithm Oid
 * @param {string} salt - the salt
 * @param {int} iterationCount - the iteration count
 * @param {string} encryptedData - the encrypted data to decrypt
 * @param {Object} nextStepFn - the function to be executed after the data is decrypted. Usually this function will process the data after it is decrypted
 */
SCrypto.PKCS12.DecryptData = function (password,algorithmOid,  salt, iterationCount,encryptedData,nextStepFn,proressBar_n,progressBarHandler){
      this.algorithm = null;
      this.keyLength = 8;	// 64 bits (default)
      this.ivLength = 8;	// 64 bits (default)
      this.encryptedData = encryptedData;
      this.nextStepFn = nextStepFn;
      this.proressBar_n = proressBar_n;
      this.progressBarHandler = progressBarHandler;
      this.standard = "";
      var hashName = "";
      this.standard = "";
      this.key = [];

      switch (algorithmOid) {
        case "1.2.840.113549.1.5.1":	// pbeWithMD2AndDESCBC no unit test available
          hashName = "MD2";
          this.algorithm = "DES";
          this.standard = "PKCS5";
          break;
        case "1.2.840.113549.1.5.3":    //pbeWithMD5AndDESCBC no unit test available
          hashName = "MD5";
          this.algorithm = "DES";
          this.standard = "PKCS5";
          break;
        case "1.2.840.113549.1.5.4":   // pbeWithMD2AndRC2CBC no unit test available
          // TODO - RC2-CBC-Parameter (PKCS5)
          // if missing default to 32 bits !!!
          hashName = "MD2";
          this.algorithm = "RC2";
          this.keyLength = 8;		// default
          this.standard = "PKCS5";
          break;
        case "1.2.840.113549.1.5.6": //pbeWithMD5AndRC2CBC  no unit test available
          // TODO - RC2-CBC-Parameter (PKCS5)
          // if missing default to 32 bits !!!
          hashName = "MD5";
          this.algorithm = "RC2";
          this.keyLength = 8;		// default
          this.standard = "PKCS5";
          break;
        case "1.2.840.113549.1.5.10": //pbeWithSHA1AndDESCBC no unit test available
          hashName = "SHA1";
          this.algorithm = "DES";
          this.standard = "PKCS5";
          break;
        case "1.2.840.113549.1.5.11":  //pbeWithSHA1AndRC2CBC no unit test available
          // TODO - RC2-CBC-Parameter (PKCS5)
          // if missing default to 32 bits !!!
          hashName = "SHA1";
          this.algorithm = "RC2";
          this.keyLength = 8;		// default
          this.standard = "PKCS5";
          break;
        case "1.2.840.113549.1.12.1.1": 		// no unit test available
          hashName = "SHA1";
          this.algorithm = "RC4";
          this.keyLength = 16;
          this.ivLength = 0;		// N/A
          this.standard = "PKCS12";
          break;
        case "1.2.840.113549.1.12.1.2": 		// no unit test available
          hashName = "SHA1";
          this.algorithm = "RC4";
          this.keyLength = 5;
          this.ivLength = 0;		// N/A
          this.standard = "PKCS12";
          break;
        case "1.2.840.113549.1.12.1.3":
          hashName = "SHA1";
          this.algorithm = "TripleDES";
          this.keyLength = 24;
          this.standard = "PKCS12";
          break;
        case "1.2.840.113549.1.12.1.4":	// no unit test available
          hashName = "SHA1";
          this.algorithm = "DoubleDES";
          this.keyLength = 16;
          this.standard = "PKCS12";
          break;
        case "1.2.840.113549.1.12.1.5": 		// no unit test available
          hashName = "SHA1";
          this.algorithm = "RC2";
          this.keyLength = 16;
          this.standard = "PKCS12";
          break;
        case "1.2.840.113549.1.12.1.6":
          hashName = "SHA1";
          this.algorithm = "RC2";
          this.keyLength = 5;
          this.standard = "PKCS12";
          break;
        default:
            var error_message = "unknown oid " + algorithm;
            var args = {
                  error : 1,
                  message :  error_message
               };
              this.nextStepFn(args);
              return;
      }

        if ( this.standard == "PKCS12") {
                this.pd = new SCrypto.PKCS12.DeriveBytes ();
        } else {
                 this.pd = new SCrypto.PKCS5.KeyDerivePBKDF1();
        }
      this.pd.setPassword(password);
      this.pd._salt = salt;
      this.pd._iterations = iterationCount;
      this.pd._hashName = hashName;

      switch (this.algorithm) {
            case "DES" :
            case "TripleDES" :
            case "DoubleDES" : this.sa = new SCrypto.DES();
                               break;
            case "RC2"       : this.sa = new SCrypto.RC2();
                               break;
            case "RC4"       : this.sa = new SCrypto.RC4();
                               break;
            default: throw new SCrypto.Exception(SCrypto.PKCS,SCrypto.Exception.AlgoNotSupported);
        }

         if ((this.ivLength > 0) && ( this.standard == "PKCS12")){
             this.proressBar_n = this.proressBar_n/2;
         }


};



SCrypto.PKCS12.DecryptData.prototype = {
     utils : SCrypto.CryptoUtils,

     /**
     * Derive Key - call the function to derive key
      */
     DeriveKey : function(){
          var deriveKeyLength = 0;
          var nextStep;
          if (this.standard == "PKCS12"){
              nextStep = this.utils.createClosure(this,this.DeriveIv);
              deriveKeyLength = this.keyLength;
          } else { // PKCS5
              nextStep = this.utils.createClosure(this,this.ProcessData);
              deriveKeyLength = this.keyLength + this.ivLength; // in PKCS5 - derive the key and iv at the same time
          }
          this.pd.setNextFunction(nextStep);
          try {
            this.pd.DeriveKey(deriveKeyLength);
          } catch (e){
              var args = {
                  error : 1,
                  message : e
              };
              this.nextStepFn(args);
          }
    },
     /**
     * Derive IV - call the function to derive iv
      */
     DeriveIv : function(){
            this.key = this.pd.dKey;

            var nextStep = this.utils.createClosure(this,this.ProcessData);
           // IV required only for block ciphers (not stream ciphers)
          if (this.ivLength > 0) {
              if (!this.progressBarHandler(this.proressBar_n)){
                  // the p12 import task has been canceled
                  return;
              }
            this.pd.setNextFunction(nextStep);
            this.pd.DeriveIV(this.ivLength);

          } else{
             nextStep();
         }
    },
    /**
     * Process Data  - decrypt the data and then call the function to process this decrypted data
      */
     ProcessData : function(){
        var mode,iv;

        if (this.standard == "PKCS12"){
            iv = this.pd.dKey;
        } else { // PKCS5
            this.key = this.pd.dKey.slice(0,8);
            iv = this.pd.dKey.slice(8,this.pd.dKey.length);
        }

        if (!this.progressBarHandler(this.proressBar_n)){
                  // the p12 import task has been canceled
                  return;
      }


      if (this.ivLength > 0){
          mode = SCrypto.CipherMode.CBC;
      } else {
          mode = SCrypto.CipherMode.ECB;
      }
      var arrayToHex = this.utils.byteArrayToHexString;

      this.sa.setParam(arrayToHex(this.key),mode,arrayToHex(iv),SCrypto.PaddingMode.None);

        var result = this.sa.decrypt(this.encryptedData);
        var args = {
            error : 0,
            message : result
        };
      this.nextStepFn(args);
    }
};



 /**
 * DeriveBytes - this class contains the code to derive the key/iv/mac key from a password, a salt and an iteration count
 * It is Adapted from BouncyCastle PKCS12ParametersGenerator.java but already modified (cut) to be able to derive by small steps -
 * It's important to run in Javascript and that will avoid the browser to ask to stop the script because it takes long time to execute
 */

SCrypto.PKCS12.DeriveBytes = function()  {
    this.keyDiversifier = [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ];
  this.ivDiversifier  = [ 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2 ];
  this.macDiversifier = [ 3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3 ];

    this._hashName = "";
  this._iterations = 0;
  this._password = "";
  this._salt = null;

  this.totalLoop = 0;
  this.alreadyLoop = 0;
  this.already_iteration = 0;
  this.A = null;
  this.I = null;
  this.dKey = null;
  this.B = null;
  this.nextFunction = null;
  this.diversifier = null;
  this.digest = null;
  this.u = 0;
  this.v = 0;

};

SCrypto.PKCS12.DeriveBytes.prototype = {
    utils : SCrypto.CryptoUtils,

   /**
   * Set the next function to execute after the derive finished
   * @param {Object} nextFunc - function to execute next
   */
    setNextFunction : function(nextFunc){
        this.nextFunction = nextFunc;
    },

    /**
   * get the Hash algo name which is used by the derive process
   */
  getHashName : function() {
    return this._hashName;
  },
  /**
   * set the Hash algo name which is used by the derive process
   * @param {string} value - the Hash algo name
   */
    setHashName : function(value) {
    this._hashName = value;
  },
  /**
   * get the iteration count which is used by the derive process
   */
  getIterationCount : function() {
    return this._iterations;
  },
  /**
   * set the iteration count which is used by the derive process
   * @param {int} value - the iteration count
   */
  setIterationCount : function(value) {
    this._iterations = value;
  },
  /**
   * get the password which is used by the derive process
   */
  getPassword : function(){
    return this._password;
  },
   /**
   * set the password which is used by the derive process
   * @param {Array} value - the password
   */
    setPassword : function(password){
        var j = 0;
        this._password = [];
        // convert password to BMI string
        for (var i = 0; i < password.length; i++){
            this._password[j++] = 0x00;
            this._password[j++] = password.charCodeAt(i);
        }
        if (password.length > 0){ // only add these two bytes in case there is a password
            this._password[j++] = 0x00;
            this._password[j] = 0x00;
        }
  },
    /**
   * get the salt which is used by the derive process
   */
  getSalt : function(){
    return this._salt;
  },

  /**
   * set the salt which is used by the derive process
   * @param {Array} value - the salt
   */
  setSalt : function(value){
      this._salt = value;
  },

    //function (byte[] a, int aOff, byte[] b)
  Adjust : function (a, aOff, b) {

    var x = (b[b.length - 1] & 0xff) + (a [aOff + b.length - 1] & 0xff) + 1;

    a [aOff + b.length - 1] =  x & 0xff;
    x >>= 8;

    for (var i = b.length - 2; i >= 0; i--) {
      x += (b [i] & 0xff) + (a [aOff + i] & 0xff);
      a [aOff + i] =  x & 0xff;
      x >>= 8;
    }
  },

    /**
   * return the ceilling of a/b
   * @param {int} a
   * @param {int} b
   */
  Ceiling_func : function(a,b){
      var r = a + b -1;
      return (r - (r%b)) / b;
  },


   /**
   * Derive function - start the derive process
   * @param {int} n - the required byte length - number of byte
   */
  Derive : function (n)
  {

     switch (this._hashName) {
            case "SHA1" : this.digest = new SCrypto.SHA1();
                          break;
            case "MD5" : this.digest = new SCrypto.MD5();
                          break;
            case "MD2" : this.digest = new SCrypto.MD2();
                          break;
            default : throw new SCrypto.Exception(SCrypto.PKCS,SCrypto.Exception.HashAlgoNotSupported);
         }


    this.u = (this.digest.HashSize >> 3); // div 8
    this.v = 64;
    this.dKey = []; //new Array(n);
        this.dKey.length = n;

    var S = [];

    if ((this._salt !== null) && (this._salt.length !== 0)) {
      //S = new Array(v * ((this._salt.length + v - 1) / v));
            //S = new Array(this.v* this.Ceiling_func(this._salt.length ,this.v));
      var s_length = this.v* this.Ceiling_func(this._salt.length ,this.v);

      for (var i = 0; i != s_length; i++) {
        S[i] = this._salt[i % this._salt.length];
      }
    }
    else {
      S = [];
    }

    var P;
    if ((this._password !== null) && (this._password.length !== 0)) {
      //P = new Array(v * ((this._password.length + v - 1) / v));
            P = []; //new Array(this.v* this.Ceiling_func(this._password.length ,this.v));
            var p_length = this.v* this.Ceiling_func(this._password.length ,this.v);
      for ( i = 0; i != p_length; i++) {
        P[i] = this._password[i % this._password.length];
      }
    }
    else {
      P = [];
    }

    this.I = []; //new Array (S.length + P.length);

    //Buffer.BlockCopy (S, 0, I, 0, S.Length);
    for ( i = 0; i < S.length; i++){
        this.I[i] = S[i];
    }
    //Buffer.BlockCopy (P, 0, I, S.Length, P.Length);
    for (i = 0; i< P.length; i++){
        this.I[S.length + i] = P[i];
    }


    this.B = []; //new Array(this.v);
    this.B.length = this.v;
    //var  c = ((n + u - 1)  - ((n + u - 1) % u)) / u;
        var c = this.Ceiling_func(n,this.u);

        this.totalLoop = c;
        this.alreadyLoop = 1;
    var nextStep = this.utils.createClosure(this,this.Derive_c);
      window.setTimeout(nextStep,20);


  },
  /**
   * Continue the derive - following the PKCS12 stanndard - we need to repeat n time - n was calculated earlier
   * @param {Object} args - contain the i-th time of derivation
   */
  Derive_c : function(args){

          //var i = args.step;

          var message = "";
      var index = 0;
      for (index = 0; index <this.diversifier.length; index++){
          message += String.fromCharCode(this.diversifier[index]);
      }
      for (index = 0; index< this.I.length; index++){
          message += String.fromCharCode(this.I[index]);
      }
      this.A = this.digest.Hash(message);
      this.already_iteration = 1;
            this.CumputeHash();
  },

  /**
   *
   * Step 2 for the Derive_c function - after computing this._iterations times of Hash
   */
  Derive_c_step2 : function(){
      // convert back to Byte Array
            var i = this.alreadyLoop;

            var tmp = [];
            for (var j=0; j< this.A.length; j++){
                tmp[j] = this.A.charCodeAt(j);
            }

            this.A = tmp;

      for ( j = 0; j < this.B.length; j++) {
        this.B [j] = this.A [j % this.A.length];
      }

           for ( j = 0; j < this.I.length / this.v; j++) {
        this.Adjust(this.I, j * this.v, this.B);
      }

      if (i  == this.totalLoop) {
          for (j = 0; j < this.dKey.length - ((i - 1) * this.u); j++){
              this.dKey[(i - 1) * this.u + j]  = this.A[j];
          }
      }
      else {
          for ( j = 0; j < this.A.length; j++){
              this.dKey[(i - 1) * this.u + j ] = this.A[j];
          }
      }

       var nextStep;

       if (this.alreadyLoop < 	this.totalLoop){
           this.alreadyLoop ++;

          nextStep = this.utils.createClosure(this,this.Derive_c);

        } else {
           nextStep = this.nextFunction;
        }
       if (nextStep !== null){
              setTimeout(nextStep,20);
         }
  },

  /**
   *
   * Computing this._iterations times of Hash - cutting by 1000 times
   */
  CumputeHash : function(){

      var n = 0;

      if (this.already_iteration < this._iterations){
           if ((this._iterations - this.already_iteration) > 1000){
              n = 1000;
           } else {
              n = this._iterations - this.already_iteration;
           }
           this.already_iteration += n;

      }
      for (var j = 0; j < n; j++) {
        this.A = this.digest.Hash(this.A);
      }

        var nextStep;

      if (this.already_iteration < this._iterations) {
          nextStep = this.utils.createClosure(this,this.CumputeHash);
          setTimeout(nextStep,20);
      } else {
         // finish the hash - now start the next step
          this.Derive_c_step2();
      }
  },

    /**
   * Derive the key -
   * @param {int} size - key size
   */
  DeriveKey : function (size)
  {
      this.diversifier  = this.keyDiversifier;
    this.Derive ( size);
  },
     /**
   * Derive the iv -
   * @param {int} size - iv size
   */
  DeriveIV : function (size)
  {
      this.diversifier  = this.ivDiversifier;
    this.Derive(size);
  },
    /**
   * Derive MAC key -
   * @param {int} size - MAC key size
   */
  DeriveMAC : function (size)
  {
      this.diversifier  = this.macDiversifier;
    this.Derive (size);
  }
};



