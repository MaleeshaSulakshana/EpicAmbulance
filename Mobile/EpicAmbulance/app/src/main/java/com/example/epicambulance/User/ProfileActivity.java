package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.R;
import com.example.epicambulance.SignUpActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class ProfileActivity extends AppCompatActivity {

    private TextView textPswChange;
    private EditText name, email, nic, number, address;
    private Button btnUpdate;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        textPswChange = (TextView) this.findViewById(R.id.textPswChange);

        name = (EditText) this.findViewById(R.id.name);
        email = (EditText) this.findViewById(R.id.email);
        nic = (EditText) this.findViewById(R.id.nic);
        number = (EditText) this.findViewById(R.id.number);
        address = (EditText) this.findViewById(R.id.address);

        btnUpdate = (Button) this.findViewById(R.id.btnUpdate);

        getProfileData();

        textPswChange.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(ProfileActivity.this, PswChangeActivity.class);
                startActivity(intent);

            }
        });

        btnUpdate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                updateProfile();

            }
        });

    }

    //    Function for get profile details
    private void getProfileData() {

        String URL = API.USER_API + "/" + Preferences.LOGGED_USER_ID;

        RequestQueue requestQueue = Volley.newRequestQueue(ProfileActivity.this);
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.GET,
                URL,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        try {

                            if (response.length() > 0) {

                                String Name = (String) response.getString("name");
                                String Email = (String) response.getString("email");
                                String NIC = (String) response.getString("nic");
                                String Number = (String) response.getString("tpNumber");
                                String Address = (String) response.getString("address");

                                name.setText(Name);
                                email.setText(Email);
                                nic.setText(NIC);
                                number.setText(Number);
                                address.setText(Address);

                            }

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(ProfileActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                    }
                }

        );

        requestQueue.add(jsonObjectRequest);

    }

    private void updateProfile() {

        String idValue = Preferences.LOGGED_USER_ID;
        String nameValue = name.getText().toString();
        String emailValue = email.getText().toString();
        String nicValue = nic.getText().toString();
        String numberValue = number.getText().toString();
        String addressValue = address.getText().toString();

        if (name.equals("") || nicValue.equals("") || numberValue.equals("") ||
                emailValue.equals("") || addressValue.equals("")) {

            Toast.makeText(ProfileActivity.this, "Fields empty!", Toast.LENGTH_SHORT).show();

        } else if (numberValue.length() != 10 ) {

            Toast.makeText(ProfileActivity.this, "Invalid mobile number!", Toast.LENGTH_SHORT).show();

        } else {

            try {
                String URL = API.USER_API + "/" + idValue;

                RequestQueue requestQueue = Volley.newRequestQueue(ProfileActivity.this);
                JSONObject jsonBody = new JSONObject();
                jsonBody.put("id", idValue);
                jsonBody.put("name", nameValue);
                jsonBody.put("email", emailValue);
                jsonBody.put("nic", nicValue);
                jsonBody.put("tpNumber", numberValue);
                jsonBody.put("address", addressValue);

                final String requestBody = jsonBody.toString();

                StringRequest stringRequest = new StringRequest(Request.Method.PUT, URL, new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {

                        Toast.makeText(ProfileActivity.this, "Profile Update Successful.", Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {

                        Toast.makeText(ProfileActivity.this, "Profile Update Failed", Toast.LENGTH_SHORT).show();
//                        Toast.makeText(ProfileActivity.this, "Some error occur" + error.toString(), Toast.LENGTH_SHORT).show();
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