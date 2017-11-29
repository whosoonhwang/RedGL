var 
inverse_c = tNMatrix[0], inverse_d = tNMatrix[1], inverse_e = tNMatrix[2], inverse_g = tNMatrix[3], 
inverse_f = tNMatrix[4], inverse_h = tNMatrix[5], i = tNMatrix[6], inverse_j = tNMatrix[7], 
inverse_k = tNMatrix[8], inverse_l = tNMatrix[9], inverse_n = tNMatrix[10], inverse_o = tNMatrix[11],
inverse_m = tNMatrix[12], inverse_p = tNMatrix[13], inverse_r = tNMatrix[14], inverse_s = tNMatrix[15],
inverse_A = inverse_c * inverse_h - inverse_d * inverse_f, 
inverse_B = inverse_c * i - inverse_e * inverse_f, 
inverse_t = inverse_c * inverse_j - inverse_g * inverse_f, 
inverse_u = inverse_d * i - inverse_e * inverse_h,
inverse_v = inverse_d * inverse_j - inverse_g * inverse_h, 
inverse_w = inverse_e * inverse_j - inverse_g * i, 
inverse_x = inverse_k * inverse_p - inverse_l * inverse_m, 
inverse_y = inverse_k * inverse_r - inverse_n * inverse_m, 
inverse_z = inverse_k * inverse_s - inverse_o * inverse_m, 
inverse_C = inverse_l * inverse_r - inverse_n * inverse_p, 
inverse_D = inverse_l * inverse_s - inverse_o * inverse_p, 
inverse_E = inverse_n * inverse_s - inverse_o * inverse_r, 
inverse_q = inverse_A * inverse_E - inverse_B * inverse_D + inverse_t * inverse_C + inverse_u * inverse_z - inverse_v * inverse_y + inverse_w * inverse_x;
inverse_q = 1 / inverse_q; 
tNMatrix[0] = (inverse_h * inverse_E - i * inverse_D + inverse_j * inverse_C) * inverse_q;
tNMatrix[1] = (-inverse_d * inverse_E + inverse_e * inverse_D - inverse_g * inverse_C) * inverse_q;
tNMatrix[2] = (inverse_p * inverse_w - inverse_r * inverse_v + inverse_s * inverse_u) * inverse_q;
tNMatrix[3] = (-inverse_l * inverse_w + inverse_n * inverse_v - inverse_o * inverse_u) * inverse_q; 
tNMatrix[4] = (-inverse_f * inverse_E + i * inverse_z - inverse_j * inverse_y) * inverse_q; 
tNMatrix[5] = (inverse_c * inverse_E - inverse_e * inverse_z + inverse_g * inverse_y) * inverse_q; 
tNMatrix[6] = (-inverse_m * inverse_w + inverse_r * inverse_t - inverse_s * inverse_B) * inverse_q;
tNMatrix[7] = (inverse_k * inverse_w - inverse_n * inverse_t + inverse_o * inverse_B) * inverse_q; 
tNMatrix[8] =(inverse_f * inverse_D - inverse_h * inverse_z + inverse_j * inverse_x) * inverse_q; tNMatrix[9] = (-inverse_c * inverse_D + inverse_d * inverse_z - inverse_g * inverse_x) * inverse_q;
tNMatrix[10] = (inverse_m * inverse_v - inverse_p * inverse_t + inverse_s * inverse_A) * inverse_q; 
tNMatrix[11] = (-inverse_k * inverse_v + inverse_l * inverse_t - inverse_o * inverse_A) * inverse_q; 
tNMatrix[12] = (-inverse_f * inverse_C + inverse_h * inverse_y - i * inverse_x) * inverse_q; 
tNMatrix[13] = (inverse_c * inverse_C - inverse_d * inverse_y + inverse_e * inverse_x) * inverse_q;
tNMatrix[14] = (-inverse_m * inverse_u + inverse_p * inverse_B - inverse_r * inverse_A) * inverse_q; 
tNMatrix[15] = (inverse_k * inverse_u - inverse_l * inverse_B + inverse_n * inverse_A) * inverse_q;
