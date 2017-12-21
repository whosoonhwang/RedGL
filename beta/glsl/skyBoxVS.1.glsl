precision lowp float;

uniform int uUseNormalTexture; // 노말텍스쳐 사용여부
uniform int uUseSpecularTexture; // 노말텍스쳐 사용여부
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
// 변수정의
vec4 la; // 암비언트
vec4 ld; // 디퓨즈
vec4 ls; // 스페큘러
vec3 N; // 노말벡터의 노말라이징
vec3 L; // 라이트 디렉션의 노말라이징
vec3 R; // 입사각에대한 반사값
vec3 E; // 아이벡터

float lambertTerm; // 램버트값
float specular; // 스페큘러값
float specularTextureValue; // 스페큘러 텍스쳐의 컬러값(r)

vec3 pointDirection; // 방향            
float distanceLength; // 거리
float attenuation;  // 감쇄

vec4 finalColor; // 최종컬러값
//define uniforms;
const int MAX_ITER = 4;
uniform sampler2D uDiffuseTexture;
uniform float uSystemTime;
uniform vec2 uSystemResolution;
//define varyings;
varying vec2 vTexcoord;
//define vars;
vec4 SHADER_TEST_OUTPUT_0;
vec4 textureColor_0;
vec4 OUTPUT_0;
//define funcs;
vec4 func_shaderTest(vec4 tColor){
    vec2 v_texCoord = gl_FragCoord.xy/uSystemResolution +vTexcoord;
    vec2 p =  (v_texCoord) * 8.0 ;
    vec2 i = p;
    float c = 1.0;
    float inten = .05;
    for (int n = 0; n < MAX_ITER; n++)
    {
        float t = uSystemTime * (2.0 - (3.0 / float(n+1)));

        i = p + vec2(cos(t - i.x) + sin(t + i.y),
        sin(t - i.y) + cos(t + i.x));

        c += 1.0/length(
            vec2(p.x / (sin(i.x+t)/inten),
        p.y / (cos(i.y+t)/inten)));
    }
    c /= float(MAX_ITER);
    c = 1.5 - sqrt(c);
    vec4 texColor = vec4(0.10, 0.55, 0.02, 1.);
    texColor.rgb *= (1.0/ (1.0 - (c + 0.05)));
    return texColor;
};
void main(void) {
//define headers;
//define headers;
    SHADER_TEST_OUTPUT_0 = func_shaderTest();
    textureColor_0 = texture2D(uDiffuseTexture,vTexcoord);
    OUTPUT_0 = textureColor_0 + SHADER_TEST_OUTPUT_0;
    vec4 texelColor_DIFFUSE = OUTPUT_0;
vec4 texelColor_NORMAL;
vec4 texelColor_SPECULAR;


la = uAmbientLightColor;
ld = vec4(0.0, 0.0, 0.0, 1.0);
ls = vec4(0.0, 0.0, 0.0, 1.0);

if(texelColor_DIFFUSE.a==0.0) discard;
E = normalize(vEyeVec);

if(uUseNormalTexture == 1) N = normalize(2.0 * (normalize(vNormal)+texelColor_NORMAL.rgb - 0.5));
else N = normalize(vNormal);

specularTextureValue = 1.0;
if(uUseSpecularTexture == 1) specularTextureValue = texelColor_SPECULAR.r ;

vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
//define bodys;
//define footers;

if(uDirectionalNum>0){
    for(int i=0;i<DIRETIONAL_MAX;i++){
        if(i== uDirectionalNum) break;
        L = normalize(uDirectionnalLightDirection[i]);
        lambertTerm =dot(N,-L);
        if(lambertTerm > 0.0){
            ld += uDirectionnalLightColor[i] * texelColor_DIFFUSE * lambertTerm;
            R = reflect(L, N);
            specular = pow( max(dot(R, -L), 0.0), uShininess);
            ls +=  specularLightColor * specular * specularTextureValue;
        }
    }
}

for(int i=0;i<POINT_MAX;i++){
    if(i== uPointNum) break;
    pointDirection = -uPointLightPosition[i] -vEyeVec;
    distanceLength = length(pointDirection);
    if(uPointLightRadius[i]> abs(distanceLength)){
        attenuation = 1.0 / (0.01 + 0.01 * distanceLength + 0.02 * distanceLength * distanceLength); 
        L = normalize(pointDirection);
        lambertTerm = dot(N,-L);
        if(lambertTerm > 0.0){
            ld += uPointLightColor[i] * texelColor_DIFFUSE * lambertTerm*attenuation;
            R = reflect(L, N);
            specular = pow( max(dot(R, -L), 0.0), uShininess);
            ls +=  specularLightColor * specular * attenuation * specularTextureValue  ;
        }
    }
}           

finalColor = la + ld + ls;
finalColor.a = texelColor_DIFFUSE.a;  
gl_FragColor = finalColor;   
}