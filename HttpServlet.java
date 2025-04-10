import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DataServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Process your data here
        String processedData = "Hello from the servlet!";

        // Add data as an attribute to the request
        request.setAttribute("message", processedData);

        // Forward the request to the JSP (or HTML)
        RequestDispatcher dispatcher = request.getRequestDispatcher("/result.jsp");
        dispatcher.forward(request, response);
    }
}
