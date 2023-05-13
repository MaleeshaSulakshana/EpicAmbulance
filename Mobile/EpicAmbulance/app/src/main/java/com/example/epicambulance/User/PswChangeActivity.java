package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.R;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class PswChangeActivity extends AppCompatActivity {

    private EditText psw, cpsw;
    private Button btnUpdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_psw_change);

        psw = (EditText) this.findViewById(R.id.psw);
        cpsw = (EditText) this.findViewById(R.id.cpsw);

        btnUpdate = (Button) this.findViewById(R.id.btnUpdate);

        btnUpdate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                updatePassword();

            }
        });

    }

    //    Function for update psw
    private void updatePassword() {

        String idValue = Preferences.LOGGED_USER_ID;
        String pswValue = psw.getText().toString();
        String cpswValue = cpsw.getText().toString();

        if (pswValue.equals("") || cpswValue.equals("")) {

            Toast.makeText(PswChangeActivity.this, "Fields empty!", Toast.LENGTH_SHORT).show();

        } else if (!pswValue.equals(cpswValue)) {

            Toast.makeText(PswChangeActivity.this, "Password and confirm password not matched!.", Toast.LENGTH_SHORT).show();

        } else {

            try {
                String URL = API.USER_API + "/" + idValue + "/psw";

                RequestQueue requestQueue = Volley.newRequestQueue(PswChangeActivity.this);
                JSONObject jsonBody = new JSONObject();
                jsonBody.put("password", pswValue);

                final String requestBody = jsonBody.toString();

                StringRequest stringRequest = new StringRequest(Request.Method.PUT, URL, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        psw.setText("");
                        cpsw.setText("");
                        
                        Toast.makeText(PswChangeActivity.this, "Profile Password Update Successful.", Toast.LENGTH_SHORT).show();

                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                        Toast.makeText(PswChangeActivity.this, "Profile Password Update Failed", Toast.LENGTH_SHORT).show();
//                        Toast.makeText(PswChangeActivity.this, "Some error occur" + error.toString(), Toast.LENGTH_SHORT).show();
                    }
                }) {
                    @Override
                    public String getBodyContentType() {
                        return "application/json; charset=utf-8";
                    }

                    @Override
                    public byte[] getBody() throws AuthFailureError {
                        try {
                            return requestBody == null ? null : requestBody.getBytes("utf-8");
                        } catch (UnsupportedEncodingException uee) {
                            return null;
                        }
                    }

                };

                requestQueue.add(stringRequest);
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }

    }

}