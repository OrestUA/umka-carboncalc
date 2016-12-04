$(document).ready(function () {
    var results = JSON.parse(localStorage.getItem('resultData')); 

    resultsBar = results.barChart;
    resultsPie = results.pieChart;

    var colorPalete;
    if (resultsBar[0].amount > resultsBar[2].amount) {
        resultsBar[0].dangerLevel = true;
        colorPalete = ['#7D0026', '#A10031', '#DC3165', '#E75984'];
    } else {
        resultsBar[0].dangerLevel = false;
        colorPalete = ['#2D5700', '#447D06', '#7AB837', '#9CD55F'];
    }

    // Bar chart config
    var barChartMargin = { top: 40, right: 10, bottom: 30, left: 50 };
    var barChartOptions = {
        width: 700 - barChartMargin.right - barChartMargin.left,
        height: 500 - barChartMargin.top - barChartMargin.bottom
    };

    // Pie chart config
    var pieChartMargin = { top: 20, right: 20, bottom: 20, left: 20 };
    var pieChartOptions = {
        width: 500 - pieChartMargin.right - pieChartMargin.left,
        height: 500 - pieChartMargin.top - pieChartMargin.bottom,
        radious: (500 - pieChartMargin.right - pieChartMargin.left) / 2
    };

    var pieColor = d3.scaleOrdinal()
        .range(colorPalete);

    createBarChart(resultsBar, '#resultsBar');
    createPieChart(resultsPie, '#resultsPie');

    // Charts generators
    function createBarChart(data, domId) {
        let svg = d3.select(domId)
            .append('svg')
            .attr('width', barChartOptions.width + barChartMargin.right + barChartMargin.left)
            .attr('height', barChartOptions.height + barChartMargin.top + barChartMargin.bottom)
            .append('g')
            .attr('transform', 'translate(' + barChartMargin.left + ',' + barChartMargin.right + ')');

        // define x and y scales
        let xScale = d3.scaleBand()
            .rangeRound([0, barChartOptions.width])
            .padding(0.1);

        let yScale = d3.scaleLinear()
            .rangeRound([barChartOptions.height, 0]);

        // define axis
        let xAxis = d3.axisBottom()
            .scale(xScale);

        let yAxis = d3.axisLeft()
            .scale(yScale)
            //   .ticks(1);
            .tickFormat(d3.format(",d"));

        // specify the domains of the x and y scales
        xScale.domain(data.map((d) => d.name));
        yScale.domain([0, d3.max(data, (d) => d.amount)]);

        // draw the bars
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d) => xScale(d.name))
            .attr('width', xScale.bandwidth())
            .attr('height', 0)                       // for animation
            .attr('y', barChartOptions.height)  // for animation
            .transition().duration(2000)             // for animation
            .delay((d, i) => i * 100)                // for animation
            // .attr('x', (d) => xScale(d.name))
            .attr('y', (d) => yScale(d.amount))
            // .attr('width', xScale.bandwidth())
            .attr('height', (d) => barChartOptions.height - yScale(d.amount))
            // .style('fill', (d, i) => 'rgb(135,206, ' + ((i * 40) + 100) + ')');             // color range
            .style('fill', (d, i) => {
                switch (i) {
                    case 0:
                        if (d.dangerLevel) {
                            return '#c90943';
                        } else {
                            return '#5E9C1C';
                        }
                    case 1:
                        return '#0097AA'
                    case 2:
                        return '#F29724'
                }
            });

        // draw the Axis
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + barChartOptions.height + ')')
            .call(xAxis);

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);
    }

    function createPieChart(data, domId) {
        // arc generator
        let arc = d3.arc()
            .outerRadius(pieChartOptions.radious - 10)
            .innerRadius(0);

        // arc for the labels position
        let labelArc = d3.arc()
            .outerRadius(pieChartOptions.radious - 40)
            .innerRadius(pieChartOptions.radious - 40);

        let pie = d3.pie()
            .sort(null)
            .value((d) => d.amount);

        // define svg
        let svg = d3.select(domId).append('svg')
            .attr('width', pieChartOptions.width)
            .attr('height', pieChartOptions.height)
            .append('g')
            .attr('transform', 'translate(' + pieChartOptions.width / 2 + ',' + pieChartOptions.height / 2 + ')');

        // append g elements (arc)
        let g = svg.selectAll('.arc')
            .data(pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        // append the path to the arc
        g.append('path')
            .attr('d', arc)
            .style('fill', (d) => pieColor(d.data.name))
            .transition()                // for animation
            .ease(d3.easeLinear)         // for animation
            .duration(2000)              // for animation
            .attrTween('d', pieTween);   // for animation

        // append the text(labels)
        g.append('text')
            .transition()               // for animation
            .ease(d3.easeLinear)        // for animation
            .duration(2000)             // for animation
            .attr('transform', (d) => 'translate(' + labelArc.centroid(d) + ')')
            .attr('dy', '.35em')
            .text((d) => d.data.name)
            .style('text-anchor', 'middle');

        // for animation  
        function pieTween(b) {
            b.innerRadius = 0;
            let i = d3.interpolate({ startAngle: 0, endEangle: 0 }, b);
            return (t) => arc(i(t));
        }
    }
});