package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.R;

import org.json.JSONException;
import org.json.JSONObject;

public class BookingDetailsViewActivity extends AppCompatActivity {

    private TextView date, hospital, ambulance, user, status, contact, details, address;
    private Button btnViewComments;

    String id = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_booking_details_view);

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

//        btnViewActions = (Button) findViewById(R.id.btnViewActions);
        btnViewComments = (Button) findViewById(R.id.btnViewComments);

        showDetails();

        btnViewComments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(BookingDetailsViewActivity.this, BookingCommentsViewActivity.class);
                intent.putExtra("id", id);
                startActivity(intent);

            }
        });

    }

    private void showDetails() {

        String URL = API.BOOKINGS_API + "/" + id;

        RequestQueue requestQueue = Volley.newRequestQueue(BookingDetailsViewActivity.this);
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

                            date.setText(strDate);
                            hospital.setText(strHospital);
                            ambulance.setText(strAmbulance);
                            user.setText(strUser);
                            status.setText(strStatus);
                            contact.setText(strContact);
                            details.setText(strDetails);
                            address.setText(strAddress);

                        } catch (JSONException e) {
                            Toast.makeText(BookingDetailsViewActivity.this, "Some error occur.",Toast.LENGTH_SHORT).show();
                            throw new RuntimeException(e);
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(BookingDetailsViewActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                    }
                }

        );

        requestQueue.add(jsonObjectRequest);

    }

}