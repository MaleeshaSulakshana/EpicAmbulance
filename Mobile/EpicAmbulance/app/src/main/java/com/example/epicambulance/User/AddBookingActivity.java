package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Looper;
import android.provider.Settings;
import android.support.annotation.NonNull;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.R;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;

import org.json.JSONException;
import org.json.JSONObject;

public class AddBookingActivity extends AppCompatActivity {

    private Button btnAdd;
    private EditText details, address, number;
    private String hospitalId = "";
    String latitude = "", longitude = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_booking);

        Intent intentThis = getIntent();
        hospitalId = intentThis.getStringExtra("hospitalId");
        latitude = intentThis.getStringExtra("latitude");
        longitude = intentThis.getStringExtra("longitude");

        btnAdd = (Button) this.findViewById(R.id.btnAdd);

        details = (EditText) this.findViewById(R.id.details);
        address = (EditText) this.findViewById(R.id.address);
        number = (EditText) this.findViewById(R.id.number);

        btnAdd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (latitude != "" && longitude != "") {

                    btnAdd.setEnabled(false);

                    String strDetails = details.getText().toString();
                    String strAddress = address.getText().toString();
                    String strNumber = number.getText().toString();

                    if (strDetails.equals("") || strAddress.equals("") || strNumber.equals("")) {
                        btnAdd.setEnabled(true);
                        Toast.makeText(AddBookingActivity.this, "Fields are empty!",Toast.LENGTH_SHORT).show();

                    } else if (strNumber.length() != 10) {
                        btnAdd.setEnabled(true);
                        Toast.makeText(AddBookingActivity.this, "Please check your mobile number!",Toast.LENGTH_SHORT).show();

                    } else {

                        try {
                            Toast.makeText(AddBookingActivity.this, "Wait for placed booking.", Toast.LENGTH_SHORT).show();
                            String URL = API.BOOKINGS_API;

                            JSONObject parameter =  new JSONObject();
                            parameter.put("details", strDetails);
                            parameter.put("address", strAddress);
                            parameter.put("tpNumber", strNumber);
                            parameter.put("userId", Preferences.LOGGED_USER_ID);
                            parameter.put("hospitalId", hospitalId);
                            parameter.put("latitude", Double.parseDouble(latitude));
                            parameter.put("longitude", Double.parseDouble(longitude));

                            JsonObjectRequest jsonObject = new JsonObjectRequest(Request.Method.POST, URL, parameter, new Response.Listener<JSONObject>() {
                                @Override
                                public void onResponse(JSONObject response) {

                                    Toast.makeText(AddBookingActivity.this, "Your Booking Placed.", Toast.LENGTH_SHORT).show();

//                                    Intent intent = new Intent(AddBookingActivity.this, InquiriesActivity.class);
//                                    startActivity(intent);
//                                    finish();

                                }
                            }, new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    btnAdd.setEnabled(true);
                                    Toast.makeText(AddBookingActivity.this, error.toString(), Toast.LENGTH_SHORT).show();
                                }
                            });

                            RequestQueue queue = Volley.newRequestQueue(AddBookingActivity.this);
                            queue.add(jsonObject);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }

                } else {
                    Toast.makeText(AddBookingActivity.this, "Waiting for get your location.", Toast.LENGTH_SHORT).show();
                }

            }
        });

    }
}