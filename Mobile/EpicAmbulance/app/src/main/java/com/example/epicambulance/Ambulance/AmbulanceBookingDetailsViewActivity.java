package com.example.epicambulance.Ambulance;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.R;
import com.example.epicambulance.User.BookingCommentsViewActivity;
import com.example.epicambulance.User.BookingDetailsViewActivity;

import org.json.JSONException;
import org.json.JSONObject;

public class AmbulanceBookingDetailsViewActivity extends AppCompatActivity {

    private TextView date, hospital, ambulance, user, status, contact, details, address;
    private Button btnViewComments, btnOpenLocation;

    String id = "", latitude = "", longitude = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_ambulance_booking_details_view);

        Intent project = getIntent();
        id = project.getStringExtra("id");

        date = (TextView) findViewById(R.id.date);
        hospital = (TextView) findViewById(R.id.hospital);
        ambulance = (TextView) findViewById(R.id.ambulance);
        user = (TextView) findViewById(R.id.user);
        status = (TextView) findViewById(R.id.status);
        contact = (TextView) findViewById(R.id.contact);
        details = (TextView) findViewById(R.id.details);
        address = (TextView) findViewById(R.id.address);

        btnOpenLocation = (Button) findViewById(R.id.btnOpenLocation);
        btnViewComments = (Button) findViewById(R.id.btnViewComments);

        showDetails();

        btnViewComments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(AmbulanceBookingDetailsViewActivity.this, AmbulanceBookingCommentsViewActivity.class);
                intent.putExtra("id", id);
                startActivity(intent);

            }
        });

        btnOpenLocation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!latitude.equals("") && !longitude.equals("")) {
                    String mapUrl = "https://www.google.com/maps/search/?api=1&query=" + latitude + "," + longitude + "";
                    openBrowser(mapUrl);
                } else {
                    Toast.makeText(AmbulanceBookingDetailsViewActivity.this, "Location not available.",Toast.LENGTH_SHORT).show();
                }
            }
        });

    }

    private void openBrowser(String link)
    {
        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(link));
        startActivity(browserIntent);
    }

    private void showDetails() {

        String URL = API.BOOKINGS_API + "/" + id;

        RequestQueue requestQueue = Volley.newRequestQueue(AmbulanceBookingDetailsViewActivity.this);
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(
                Request.Method.GET,
                URL,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {

                        String strDate = null;
                        try {
                            strDate = (String) response.getString("dateTime");
                            JSONObject hospitalDetails = (JSONObject) response.getJSONObject("hospital");
                            String strHospital = (String) hospitalDetails.getString("name");

                            JSONObject ambulanceDetails = (JSONObject) response.getJSONObject("ambulance");
                            String strAmbulance = (String) ambulanceDetails.getString("vehicleNo");

                            JSONObject userDetails = (JSONObject) response.getJSONObject("user");
                            String strUser = (String) userDetails.getString("name");

                            String strStatus = (String) response.getString("status");
                            String strContact = (String) response.getString("tpNumber");
                            String strDetails = (String) response.getString("details");
                            String strAddress = (String) response.getString("address");

                            String strLatitude = (String) response.getString("latitude");
                            String strLongitude = (String) response.getString("longitude");

                            date.setText(strDate);
                            hospital.setText(strHospital);
                            ambulance.setText(strAmbulance);
                            user.setText(strUser);
                            status.setText(strStatus);
                            contact.setText(strContact);
                            details.setText(strDetails);
                            address.setText(strAddress);

                            latitude = strLatitude;
                            longitude = strLongitude;

                        } catch (JSONException e) {
                            Toast.makeText(AmbulanceBookingDetailsViewActivity.this, "Some error occur.",Toast.LENGTH_SHORT).show();
                            throw new RuntimeException(e);
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(AmbulanceBookingDetailsViewActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                    }
                }

        );

        requestQueue.add(jsonObjectRequest);

    }

}