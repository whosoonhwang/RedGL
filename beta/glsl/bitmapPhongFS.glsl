precision lowp float;
varying vec2 vTexcoord;
uniform sampler2D uTexture; // 디뷰프텍스쳐
uniform sampler2D uNormalTexture; // 노말텍스쳐
uniform int uUseNormalTexture; // 노말텍스쳐 사용여부
varying vec3 vEyeVec;
varying vec3 vNormal;


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
    vec4 texelColor = texture2D(uTexture, vTexcoord);
    if(texelColor.a==0.0) discard;
    vec3 N;
    vec3 L;
    vec3 R;
    vec3 E = normalize(vEyeVec);
    
    if(uUseNormalTexture == 1) N = normalize(2.0 * (normalize(vNormal)+texture2D(uNormalTexture, vTexcoord).rgb - 0.5));
    else N = normalize(vNormal);

    float lambertTerm;
    float specular;
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
                ls +=  specularLightColor * specular;
            }
        }
    }

    vec3 pointDirection; // 방향            
    float distance; // 거리
    float attenuation;  // 감쇄
    for(int i=0;i<POINT_MAX;i++){
        if(i== uPointNum) break;
        pointDirection = -uPointLightPosition[i] -vEyeVec;
        distance = length(pointDirection);
        if(uPointLightRadius[i]> abs(distance)){
            attenuation = 1.0 / (0.01 + 0.01 * distance + 0.02 * distance * distance); 
            L = normalize(pointDirection);
            lambertTerm = dot(N,-L);
            if(lambertTerm > 0.0){
                ld += uPointLightColor[i] * texelColor * lambertTerm*attenuation;
                R = reflect(L, N);
                specular = pow( max(dot(R, -L), 0.0), uShininess);
                ls +=  specularLightColor * specular * attenuation  ;
            }
        }
    }           
    
    vec4 finalColor = la + ld + ls;
    finalColor.a = texelColor.a;            
    gl_FragColor = finalColor;   
}