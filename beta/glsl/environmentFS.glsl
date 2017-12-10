precision lowp float;

uniform samplerCube uTexture; // 디뷰프텍스쳐
uniform sampler2D uNormalTexture; // 노말텍스쳐
uniform sampler2D uSpecularTexture; // 노말텍스쳐
uniform int uUseNormalTexture; // 노말텍스쳐 사용여부
uniform int uUseSpecularTexture; // 노말텍스쳐 사용여부
varying vec2 vTexcoord;
varying vec3 vEyeVec;
varying vec3 vNormal;

varying vec3 vCubeCoord;

// 암비안트
uniform vec4 uAmbientLightColor;

//디렉셔널 리스트
const int DIRETIONAL_MAX = 16;
uniform vec3 uDirectionnalLightDirection[DIRETIONAL_MAX];
uniform vec4 uDirectionnalLightColor[DIRETIONAL_MAX];
uniform int uDirectionalNum;

//포인트라이트
const int POINT_MAX = 16;
uniform vec4 uPointLightColor[POINT_MAX];      
uniform vec3 uPointLightPosition[POINT_MAX];
uniform float uPointLightRadius[POINT_MAX];
uniform int uPointNum;

uniform float uShininess;

void main(void) {
    vec4 la = uAmbientLightColor;
    vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 texelColor = textureCube(uTexture, vCubeCoord);
    if(texelColor.a==0.0) discard;
    vec3 N;
    vec3 L;
    vec3 R;
    vec3 E = normalize(vEyeVec);
    
    if(uUseNormalTexture == 1) N = normalize(2.0 * (normalize(vNormal)+texture2D(uNormalTexture, vTexcoord).rgb - 0.5));
    else N = normalize(vNormal);

    float lambertTerm;
    float specular;
    float specularTextureValue = 1.0;

    if(uUseSpecularTexture == 1) specularTextureValue = texture2D(uSpecularTexture, vTexcoord).r ;

    vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
    if(uDirectionalNum>0){
        for(int i=0;i<DIRETIONAL_MAX;i++){
            if(i== uDirectionalNum) break;
            L = normalize(uDirectionnalLightDirection[i]);
            lambertTerm =dot(N,-L);
            if(lambertTerm > 0.0){
                ld += uDirectionnalLightColor[i] * texelColor * lambertTerm;
                R = reflect(L, N);
                specular = pow( max(dot(R, -L), 0.0), uShininess);
                ls +=  specularLightColor * specular * specularTextureValue;
            }
        }
    }

    vec3 pointDirection; // 방향            
    float distanceLength; // 거리
    float attenuation;  // 감쇄
    for(int i=0;i<POINT_MAX;i++){
        if(i== uPointNum) break;
        pointDirection = -uPointLightPosition[i] -vEyeVec;
        distanceLength = length(pointDirection);
        if(uPointLightRadius[i]> abs(distanceLength)){
            attenuation = 1.0 / (0.01 + 0.01 * distanceLength + 0.02 * distanceLength * distanceLength); 
            L = normalize(pointDirection);
            lambertTerm = dot(N,-L);
            if(lambertTerm > 0.0){
                ld += uPointLightColor[i] * texelColor * lambertTerm*attenuation;
                R = reflect(L, N);
                specular = pow( max(dot(R, -L), 0.0), uShininess);
                ls +=  specularLightColor * specular * attenuation * specularTextureValue  ;
            }
        }
    }           
    
    vec4 finalColor = la + ld + ls;
    finalColor.a = texelColor.a;            
    gl_FragColor = finalColor;   
}