using Moq;
using Moq.Protected;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using the_beautiful_game_api.Models;
using the_beautiful_game_api.Services;
using Xunit;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using System.Threading;

namespace the_beautiful_game_api_unit_tests
{
    public class HighlightsServiceTests
    {
        private HighlightsService _highlightService;
        private Mock<IHttpClientFactory> _mockHttpClientFactory;
        private Mock<HttpMessageHandler> _mockHttpMessageHandler;
        private LatestHighlights latestHighlights = new LatestHighlights()
        {
            Response = new List<Highlight>()
            {
                new Highlight()
                {
                    Competition = "BRASIL: Serie B",
                    Title = "Coribita - Brusque",
                    MatchViewUrl = "url",
                    Date = DateTime.Now,
                    Thumbnail = "thumbnail",
                    Videos = new List<Video>()
                    {
                        new Video()
                        {
                            Title = "Highlights",
                            Embed = "embed"
                        }
                    }

                }
            }
        }; 

        public HighlightsServiceTests()
        {
            _mockHttpClientFactory = new Mock<IHttpClientFactory>();
            _mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            _highlightService = new HighlightsService(_mockHttpClientFactory.Object);
        }

        [Fact]
        public async Task GetLatestHighlightsShouldReturnResponseOnSuccess()
        {
            // GetAsync internally calls SendAsync
            _mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", 
                ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent("{'response': " + JsonConvert.SerializeObject(latestHighlights.Response) + "}")
                });
            _mockHttpClientFactory.Setup(x => x.CreateClient(string.Empty)).Returns(new HttpClient(_mockHttpMessageHandler.Object));
            
            var response = (Assert.IsType<OkObjectResult>(await _highlightService.GetLatestHighlights()).Value) as List<Highlight>;
            Assert.IsType<List<Highlight>>(response);

            _mockHttpClientFactory.Verify(x => x.CreateClient(string.Empty), Times.Once());
            _mockHttpMessageHandler.Protected().Verify("SendAsync", Times.Once(), ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>());
        }

        [Fact]
        public async Task GetLatestHighlightsShouldReturn500OnError()
        {
            // GetAsync internally calls SendAsync
            _mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.InternalServerError,
                });
            _mockHttpClientFactory.Setup(x => x.CreateClient(string.Empty)).Returns(new HttpClient(_mockHttpMessageHandler.Object));

            var response = Assert.IsType<StatusCodeResult>(await _highlightService.GetLatestHighlights());
            Assert.Equal((int)HttpStatusCode.InternalServerError, response.StatusCode); 

            _mockHttpClientFactory.Verify(x => x.CreateClient(string.Empty), Times.Once());
            _mockHttpMessageHandler.Protected().Verify("SendAsync", Times.Once(), ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>());
        }
    }
}
