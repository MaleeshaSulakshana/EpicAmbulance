package com.example.epicambulance.User;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.epicambulance.Classes.API;
import com.example.epicambulance.Classes.Preferences;
import com.example.epicambulance.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class BookingsActivity extends AppCompatActivity {

    private ListView listView;
    private ArrayList<Booking> detailsArrayList = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bookings);

        listView = findViewById(R.id.listView);

        showDetails();

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int i, long id) {

                String selected = String.valueOf(detailsArrayList.get(i).getId());

                Intent intent = new Intent(BookingsActivity.this, BookingDetailsViewActivity.class);
                intent.putExtra("id", selected);
                startActivity(intent);

            }
        });

    }

    private void showDetails()
    {
        detailsArrayList.clear();
        listView.setAdapter(null);

        BookingAdapter bookingAdapter = new BookingAdapter(this, R.layout.row_booking_item, detailsArrayList);
        listView.setAdapter(bookingAdapter);

        String URL = API.BOOKINGS_API + "/user/" + Preferences.LOGGED_USER_ID;

        RequestQueue requestQueue = Volley.newRequestQueue(BookingsActivity.this);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(
                Request.Method.GET,
                URL,
                null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {

                        try {

                            for (int index = 0; index < response.length(); index++) {

                                JSONObject responseData = response.getJSONObject(index);

                                String id = (String) responseData.getString("id");
                                JSONObject hospitalData = (JSONObject) responseData.getJSONObject("hospital");
                                String hospital = (String) hospitalData.getString("name");
                                String dateTime = (String) responseData.getString("dateTime");
                                String status = (String) responseData.getString("status");

                                detailsArrayList.add(new Booking(id,hospital,dateTime,status));

                            }

                            bookingAdapter.notifyDataSetChanged();

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(BookingsActivity.this, error.toString(),Toast.LENGTH_SHORT).show();
                    }
                }

        );

        requestQueue.add(jsonArrayRequest);

    }

}

class Booking {

    String id, hospital, dateTime, status;

    public Booking(String id, String hospital, String dateTime, String status) {
        this.id = id;
        this.hospital = hospital;
        this.dateTime = dateTime;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getHospital() {
        return hospital;
    }

    public String getDateTime() {
        return dateTime;
    }

    public String getStatus() {
        return status;
    }
}

class BookingAdapter extends ArrayAdapter<Booking> {

    private Context mContext;
    private int mResource;

    public BookingAdapter(@NonNull Context context, int resource, @NonNull ArrayList<Booking> objects) {
        super(context, resource, objects);

        this.mContext = context;
        this.mResource = resource;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        LayoutInflater layoutInflater = LayoutInflater.from(mContext);
        convertView = layoutInflater.inflate(mResource, parent, false);

        TextView hospital = (TextView) convertView.findViewById(R.id.hospital);
        TextView date = (TextView) convertView.findViewById(R.id.date);
        TextView status = (TextView) convertView.findViewById(R.id.status);

        hospital.setText(getItem(position).getHospital());
        date.setText(getItem(position).getDateTime());
        status.setText(getItem(position).getStatus());

        return convertView;
    }

}